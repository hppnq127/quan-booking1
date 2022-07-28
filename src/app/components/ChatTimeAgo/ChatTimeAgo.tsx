export const ChatTimeAgo =  function(number: number, index: number): [string, string] {
    return [
      ['Vừa xong', 'một lúc'],
      ['Vừa xong', 'trong %s giây'],
      ['1 phút', 'trong 1 phút'],
      ['%s phút', 'trong %s phút'],
      ['1 giờ', 'trong 1 giờ'],
      ['%s giờ', 'trong %s giờ'],
      ['1 ngày', 'trong 1 ngày'],
      ['%s ngày', 'trong %s ngày'],
      ['1 tuần', 'trong 1 tuần'],
      ['%s tuần', 'trong %s tuần'],
      ['1 tháng', 'trong 1 tháng'],
      ['%s tháng', 'trong %s tháng'],
      ['1 năm', 'trong 1 năm'],
      ['%s năm', 'trong %s năm'],
    ][index] as [string, string];
  }