export default function note({ content, createdAt, lastUpdatedAt, userId }) {
  return {
    getContent: () => content,
    getCreatedAt: () => createdAt,
    getLastUpdatedAt: () => lastUpdatedAt,
    getUserId: () => userId,
  };
}
