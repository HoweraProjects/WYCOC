/** 投掷 times 个 dice 面骰子，结果加上 plus */
export function roll(dice: number, times = 1, plus = 0): number {
  let sum = plus;
  for (let i = 0; i < times; i++) {
    sum += Math.floor(Math.random() * dice) + 1;
  }
  return sum;
}

/** 解析并投掷形如 "1D6"、"2D6+3"、"3" 的表达式，返回每颗骰子的结果与总和 */
export function rollExpr(expr: string): { rolls: number[]; total: number; ok: boolean } {
  const m = expr.replace(/\s/g, '').toUpperCase().match(/^(\d*)D(\d+)([+-]\d+)?$|^(\d+)$/);
  if (!m) return { rolls: [], total: 0, ok: false };
  if (m[4] !== undefined) {
    const n = Number(m[4]);
    return { rolls: [n], total: n, ok: true };
  }
  const times = m[1] ? Number(m[1]) : 1;
  const faces = Number(m[2]);
  const mod = m[3] ? Number(m[3]) : 0;
  const rolls: number[] = [];
  for (let i = 0; i < times; i++) rolls.push(Math.floor(Math.random() * faces) + 1);
  const total = rolls.reduce((a, b) => a + b, 0) + mod;
  return { rolls, total, ok: true };
}

/** 成长检定：D100 > 当前值则 +1D10 */
export function growCheck(value: number): number {
  if (roll(100) > value) return value + roll(10);
  return value;
}
