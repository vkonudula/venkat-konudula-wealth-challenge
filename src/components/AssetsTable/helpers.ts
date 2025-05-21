export function groupAssetsDataIntoCategoryAndSubCategories(data: any[]) {
  const primaryKey = "primaryAssetCategory";
  const secondaryKey = "wealthAssetType";

  const groupedData = data.reduce((acc, curr) => {
    const assetType = curr[primaryKey];
    const subCategory = curr[secondaryKey];
    if (assetType in acc) {
      if (subCategory in acc[assetType]) {
        acc[assetType][subCategory].push(curr);
      } else {
        acc[assetType][subCategory] = [curr];
      }
    } else {
      acc[assetType] = {
        [subCategory]: [curr],
      };
    }
    return acc;
  }, {});

  return groupedData;
}

export function transformAssetsToTree(groupedAssets: any) {
  const result = [];
  let id = 0;

  for (const primaryCategory in groupedAssets) {
    const primary = {
      id: `${primaryCategory}_${id}`,
      name: primaryCategory,
      balanceCurrent: 0,
      children: [] as Record<string, any>[],
    };

    for (const wealthType in groupedAssets[primaryCategory]) {
      const assets = groupedAssets[primaryCategory][wealthType];

      const wealth: Record<string, any> = {
        id: `${wealthType}_${++id}`,
        name: wealthType,
        balanceCurrent: 0,
        children: [] as any[],
      };

      assets.forEach((asset: any) => {
        const balance = asset.balanceCurrent || 0;
        wealth.balanceCurrent += balance;
        wealth.children.push({
          id: asset.assetId,
          name: asset.nickname,
          balanceCurrent: asset.balanceCurrent,
          children: [],
        });
      });

      primary.balanceCurrent += wealth.balanceCurrent;
      primary.children.push(wealth);
    }

    result.push(primary);
  }

  return result;
}

export function getAssetById(assets: any[], assetId: string) {
  return assets.find((item) => item.assetId === assetId);
}
