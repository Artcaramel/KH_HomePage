export const isDateInRange = (itemDate, startDate, endDate) => {
  if (!startDate && !endDate) return true; // 둘 다 빈 경우 모든 날짜 통과
  if (startDate > endDate) return false; // 시작일이 종료일보다 이후일 경우 빈 결과 반환

  const itemDateObj = new Date(itemDate); // `item.날짜`를 Date 형식으로 변환
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (start && end) return itemDateObj >= start && itemDateObj <= end;
  if (start) return itemDateObj >= start;
  if (end) return itemDateObj <= end;

  return true;
};
