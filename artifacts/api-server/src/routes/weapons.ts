import { Router, type IRouter } from "express";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
import {
  CreateWeaponCommentBody,
  CreateWeaponCommentParams,
  GetWeaponParams,
  ListWeaponCommentsParams,
  ListWeaponsQueryParams,
} from "@workspace/api-zod";
import {
  commentsTable,
  db,
  weaponImagesTable,
  weaponResourcesTable,
  weaponsTable,
} from "@workspace/db";

const router: IRouter = Router();

type WeaponRow = typeof weaponsTable.$inferSelect;

function toIsoDate(value: Date) {
  return value.toISOString();
}

function buildSummary(
  row: WeaponRow,
  counts: Map<number, number>,
  parentSlugs: Map<number, string>,
) {
  return {
    slug: row.slug,
    title: row.title,
    family: row.family,
    manufacturer: row.manufacturer,
    country: row.country,
    ammunition: row.ammunition,
    kind: row.kind,
    summary: row.summary,
    imageUrl: row.imageUrl,
    yearFrom: row.yearFrom,
    yearTo: row.yearTo,
    variantOf: row.variantOfId ? parentSlugs.get(row.variantOfId) ?? null : null,
    variantCount: counts.get(row.id) ?? 0,
  };
}

async function getPublishedWeapon(slug: string) {
  const rows = await db
    .select()
    .from(weaponsTable)
    .where(and(eq(weaponsTable.slug, slug), eq(weaponsTable.published, true)))
    .limit(1);
  return rows[0];
}

router.get("/weapons", async (req, res) => {
  const params = ListWeaponsQueryParams.parse(req.query);
  const filters = [eq(weaponsTable.published, true)];

  if (params.q) filters.push(ilike(weaponsTable.title, `%${params.q}%`));
  if (params.family) filters.push(eq(weaponsTable.family, params.family));
  if (params.ammunition) filters.push(eq(weaponsTable.ammunition, params.ammunition));
  if (params.country) filters.push(eq(weaponsTable.country, params.country));
  if (params.manufacturer) {
    filters.push(eq(weaponsTable.manufacturer, params.manufacturer));
  }

  const [rows, allRows] = await Promise.all([
    db
      .select()
      .from(weaponsTable)
      .where(and(...filters))
      .orderBy(asc(weaponsTable.title))
      .limit(params.limit),
    db
      .select({
        id: weaponsTable.id,
        slug: weaponsTable.slug,
        variantOfId: weaponsTable.variantOfId,
      })
      .from(weaponsTable)
      .where(eq(weaponsTable.published, true)),
  ]);

  const counts = new Map<number, number>();
  const parentSlugs = new Map<number, string>();
  for (const item of allRows) {
    parentSlugs.set(item.id, item.slug);
    if (item.variantOfId) {
      counts.set(item.variantOfId, (counts.get(item.variantOfId) ?? 0) + 1);
    }
  }

  const data = rows
    .map((row) => buildSummary(row, counts, parentSlugs))
    .sort((left, right) => {
      if (!params.q) return left.title.localeCompare(right.title, "ru");
      const query = params.q.toLocaleLowerCase("ru");
      const leftExact = left.title.toLocaleLowerCase("ru") === query;
      const rightExact = right.title.toLocaleLowerCase("ru") === query;
      if (leftExact !== rightExact) return leftExact ? -1 : 1;
      return left.title.localeCompare(right.title, "ru");
    });

  res.json(data);
});

router.get("/weapons/meta", async (_req, res) => {
  const [families, ammunition, countries, manufacturers] = await Promise.all([
    db
      .selectDistinct({ value: weaponsTable.family })
      .from(weaponsTable)
      .where(eq(weaponsTable.published, true))
      .orderBy(asc(weaponsTable.family)),
    db
      .selectDistinct({ value: weaponsTable.ammunition })
      .from(weaponsTable)
      .where(eq(weaponsTable.published, true))
      .orderBy(asc(weaponsTable.ammunition)),
    db
      .selectDistinct({ value: weaponsTable.country })
      .from(weaponsTable)
      .where(eq(weaponsTable.published, true))
      .orderBy(asc(weaponsTable.country)),
    db
      .selectDistinct({ value: weaponsTable.manufacturer })
      .from(weaponsTable)
      .where(eq(weaponsTable.published, true))
      .orderBy(asc(weaponsTable.manufacturer)),
  ]);

  res.json({
    families: families.map((item) => item.value),
    ammunition: ammunition.map((item) => item.value),
    countries: countries.map((item) => item.value),
    manufacturers: manufacturers.map((item) => item.value),
  });
});

router.get("/weapons/:slug", async (req, res) => {
  const { slug } = GetWeaponParams.parse(req.params);
  const row = await getPublishedWeapon(slug);
  if (!row) {
    res.status(404).json({ error: "Карточка не найдена" });
    return;
  }

  const [allRows, variants, images, resources] = await Promise.all([
    db
      .select({
        id: weaponsTable.id,
        slug: weaponsTable.slug,
        variantOfId: weaponsTable.variantOfId,
      })
      .from(weaponsTable)
      .where(eq(weaponsTable.published, true)),
    db
      .select()
      .from(weaponsTable)
      .where(and(eq(weaponsTable.variantOfId, row.id), eq(weaponsTable.published, true)))
      .orderBy(asc(weaponsTable.title)),
    db
      .select()
      .from(weaponImagesTable)
      .where(eq(weaponImagesTable.weaponId, row.id))
      .orderBy(asc(weaponImagesTable.id)),
    db
      .select()
      .from(weaponResourcesTable)
      .where(eq(weaponResourcesTable.weaponId, row.id))
      .orderBy(asc(weaponResourcesTable.id)),
  ]);

  const counts = new Map<number, number>();
  const parentSlugs = new Map<number, string>();
  for (const item of allRows) {
    parentSlugs.set(item.id, item.slug);
    if (item.variantOfId) {
      counts.set(item.variantOfId, (counts.get(item.variantOfId) ?? 0) + 1);
    }
  }

  res.json({
    ...buildSummary(row, counts, parentSlugs),
    description: row.description,
    principle: row.principle,
    safetyNote: row.safetyNote,
    variants: variants.map((variant) => buildSummary(variant, counts, parentSlugs)),
    images: images.map((image) => ({
      url: image.url,
      alt: image.alt,
      caption: image.caption,
      sourceUrl: image.sourceUrl,
      sourceName: image.sourceName,
    })),
    resources: resources.map((resource) => ({
      title: resource.title,
      url: resource.url,
      kind: resource.kind,
      description: resource.description,
      sourceName: resource.sourceName,
    })),
  });
});

router.get("/weapons/:slug/comments", async (req, res) => {
  const { slug } = ListWeaponCommentsParams.parse(req.params);
  const row = await getPublishedWeapon(slug);
  if (!row) {
    res.status(404).json({ error: "Карточка не найдена" });
    return;
  }

  const comments = await db
    .select()
    .from(commentsTable)
    .where(and(eq(commentsTable.weaponId, row.id), eq(commentsTable.status, "published")))
    .orderBy(desc(commentsTable.createdAt));

  res.json(
    comments.map((comment) => ({
      id: comment.id,
      weaponSlug: row.slug,
      nickname: comment.nickname,
      body: comment.body,
      createdAt: toIsoDate(comment.createdAt),
    })),
  );
});

router.post("/weapons/:slug/comments", async (req, res) => {
  const { slug } = CreateWeaponCommentParams.parse(req.params);
  const body = CreateWeaponCommentBody.parse({
    nickname: typeof req.body?.nickname === "string" ? req.body.nickname.trim() : req.body?.nickname,
    body: typeof req.body?.body === "string" ? req.body.body.trim() : req.body?.body,
  });
  const row = await getPublishedWeapon(slug);
  if (!row) {
    res.status(404).json({ error: "Карточка не найдена" });
    return;
  }

  const inserted = await db
    .insert(commentsTable)
    .values({
      weaponId: row.id,
      nickname: body.nickname,
      body: body.body,
    })
    .returning();
  const comment = inserted[0];

  req.log.info({ weaponSlug: row.slug, commentId: comment.id }, "Weapon comment created");
  res.status(201).json({
    id: comment.id,
    weaponSlug: row.slug,
    nickname: comment.nickname,
    body: comment.body,
    createdAt: toIsoDate(comment.createdAt),
  });
});

export default router;