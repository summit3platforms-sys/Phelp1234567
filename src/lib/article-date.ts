export interface ArticleWithDates {
  createdAt: Date;
  publishedAt?: Date | null;
  updatedAt?: Date;
  reviewedAt?: Date | null;
  revisions?: { createdAt: Date }[];
}

/**
 * Computes truthful, Google-compliant published and modified dates for an article.
 * Prevents "Artificial Date Freshness" penalties by tying dateModified to genuine
 * editorial revisions or expert reviews rather than bulk database record touches.
 */
export function getArticleEffectiveDates(article: ArticleWithDates) {
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt)
    : new Date(article.createdAt);

  const latestRevisionDate =
    article.revisions && article.revisions.length > 0
      ? new Date(article.revisions[0].createdAt)
      : null;

  const candidateModified = article.reviewedAt
    ? new Date(article.reviewedAt)
    : latestRevisionDate;

  // A genuine editorial modification must be recorded and occur at least 24 hours after publication
  const hasRealContentUpdate = Boolean(
    candidateModified &&
      candidateModified.getTime() - publishedDate.getTime() > 24 * 60 * 60 * 1000
  );

  const effectiveModifiedDate =
    hasRealContentUpdate && candidateModified ? candidateModified : publishedDate;

  return {
    publishedDate,
    modifiedDate: effectiveModifiedDate,
    hasRealContentUpdate,
    formattedPublished: publishedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    formattedModified: effectiveModifiedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    displayLabel: hasRealContentUpdate
      ? `Updated: ${effectiveModifiedDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}`
      : `Published: ${publishedDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}`,
  };
}
