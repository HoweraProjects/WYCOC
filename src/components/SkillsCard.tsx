import { useMemo } from 'react';
import {
  Box,
  Grid2 as Grid,
  TextField,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Stack,
  Button,
  Chip,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import type { Character, SkillRow } from '../types';
import { skillTable, allSkillDefs } from '../data/skills';
import { findOccupation } from '../data/occupations';
import { skillTotal, half, fifth, usedOccPoints, usedIntPoints } from '../logic/skills';

interface Props {
  character: Character;
  update: (patch: Partial<Character> | ((c: Character) => Partial<Character>)) => void;
}

const groupColors: Record<string, string> = {
  特殊: '#7d5418',
  探索: '#2f6f6a',
  社交: '#9148db',
  战斗: '#c0392b',
  医疗: '#3c8a4e',
  运动: '#2980b9',
  知识: '#b07b2c',
  技术: '#16a085',
  操纵: '#8e44ad',
};

function PointPool({
  label,
  used,
  total,
  onTotal,
  onAuto,
  autoLabel,
  color,
}: {
  label: string;
  used: number;
  total: string;
  onTotal: (v: string) => void;
  onAuto?: () => void;
  autoLabel?: string;
  color: string;
}) {
  const t = Number(total) || 0;
  const remain = t - used;
  return (
    <Paper variant="outlined" sx={{ p: 1.25, borderColor: `${color}55`, background: `${color}0d` }}>
      <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap>
        <Typography variant="subtitle2" sx={{ color, minWidth: 64 }}>
          {label}
        </Typography>
        <TextField
          label="总点数"
          type="number"
          value={total}
          onChange={(e) => onTotal(e.target.value)}
          sx={{ width: 96 }}
        />
        <Typography variant="body2">
          已用 <b>{used}</b>
        </Typography>
        <Chip
          size="small"
          label={`剩余 ${remain}`}
          color={remain < 0 ? 'error' : remain === 0 && t > 0 ? 'success' : 'default'}
          variant={remain === 0 ? 'filled' : 'outlined'}
        />
        {onAuto && (
          <Tooltip title={autoLabel || ''}>
            <Button size="small" startIcon={<AutoFixHighIcon />} onClick={onAuto}>
              自动
            </Button>
          </Tooltip>
        )}
      </Stack>
    </Paper>
  );
}

export default function SkillsCard({ character, update }: Props) {
  const rows = character.skills;

  const setRows = (next: SkillRow[]) => update({ skills: next });

  const patchRow = (idx: number, patch: Partial<SkillRow> | { point: Partial<SkillRow['point']> }) => {
    const next = rows.slice();
    const cur = next[idx];
    if ('point' in patch && patch.point) {
      next[idx] = { ...cur, point: { ...cur.point, ...patch.point } };
    } else {
      next[idx] = { ...cur, ...(patch as Partial<SkillRow>) };
    }
    setRows(next);
  };

  const numField = (v: string) => (v === '' ? 0 : Math.max(0, Number(v) || 0));

  const addSub = (defName: string) => {
    const def = allSkillDefs.find((d) => d.name === defName);
    if (!def) return;
    // 插入到该 defName 最后一行之后
    let lastIdx = -1;
    rows.forEach((r, i) => {
      if (r.defName === defName) lastIdx = i;
    });
    const newRow: SkillRow = {
      defName,
      sub: '',
      label: defName,
      init: def.init,
      point: { pro: 0, interest: 0, grow: 0 },
    };
    const next = rows.slice();
    next.splice(lastIdx + 1, 0, newRow);
    setRows(next);
  };

  const removeRow = (idx: number) => {
    const next = rows.slice();
    next.splice(idx, 1);
    setRows(next);
  };

  const occ = findOccupation(character.occupation);

  const autoFillOcc = () => {
    if (!occ) return;
    const get = (k: keyof Character['attributes']) =>
      typeof character.attributes[k] === 'number' ? (character.attributes[k] as number) : 0;
    const f = occ.formula;
    let val = (f.alts ? Math.max(get(f.primary), ...f.alts.map(get)) : get(f.primary)) * (f.secondary ? 2 : 4);
    if (f.secondary) {
      const sec = f.secondaryAlts
        ? Math.max(get(f.secondary), ...f.secondaryAlts.map(get))
        : get(f.secondary);
      val += sec * 2;
    }
    update({ occPoints: String(val) });
  };

  const autoFillInt = () => {
    const int = typeof character.attributes.int === 'number' ? character.attributes.int : 0;
    update({ intPoints: String(int * 2) });
  };

  // 把扁平 rows 按组别归类（保持顺序）
  const grouped = useMemo(() => {
    const defGroup = new Map<string, string>();
    skillTable.forEach((g) => g.skills.forEach((s) => defGroup.set(s.name, g.group)));
    const map = new Map<string, { idx: number; row: SkillRow }[]>();
    skillTable.forEach((g) => map.set(g.group, []));
    rows.forEach((row, idx) => {
      const grp = defGroup.get(row.defName) || '其它';
      if (!map.has(grp)) map.set(grp, []);
      map.get(grp)!.push({ idx, row });
    });
    return map;
  }, [rows]);

  const groupableInGroup = (group: string) =>
    skillTable.find((g) => g.group === group)?.skills.filter((s) => s.group) || [];

  return (
    <Box>
      <Grid container spacing={1.25} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PointPool
            label="职业点"
            color="#2f6f6a"
            used={usedOccPoints(rows)}
            total={character.occPoints}
            onTotal={(v) => update({ occPoints: v })}
            onAuto={occ ? autoFillOcc : undefined}
            autoLabel={occ ? `按「${occ.name}」公式：${occ.formula.label}` : ''}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PointPool
            label="兴趣点"
            color="#b07b2c"
            used={usedIntPoints(rows)}
            total={character.intPoints}
            onTotal={(v) => update({ intPoints: v })}
            onAuto={autoFillInt}
            autoLabel="智力 × 2"
          />
        </Grid>
      </Grid>

      {occ && occ.skills[0] !== '（自由分配职业技能）' && (
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            「{occ.name}」职业技能：
          </Typography>{' '}
          {occ.skills.map((s) => (
            <Chip key={s} label={s} size="small" variant="outlined" sx={{ m: 0.25 }} />
          ))}
        </Box>
      )}

      {/* 列头 */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'grid' },
          gridTemplateColumns: '1.6fr 48px 56px 56px 56px 56px 48px 48px 32px',
          gap: 0.5,
          px: 1,
          py: 0.5,
          color: 'text.secondary',
          fontSize: 12,
        }}
      >
        <span>技能</span>
        <span style={{ textAlign: 'center' }}>初始</span>
        <span style={{ textAlign: 'center' }}>职业</span>
        <span style={{ textAlign: 'center' }}>兴趣</span>
        <span style={{ textAlign: 'center' }}>成长</span>
        <span style={{ textAlign: 'center', fontWeight: 700 }}>合计</span>
        <span style={{ textAlign: 'center' }}>半值</span>
        <span style={{ textAlign: 'center' }}>1/5</span>
        <span />
      </Box>

      {skillTable.map((g) => {
        const items = grouped.get(g.group) || [];
        const color = groupColors[g.group] || '#2f6f6a';
        const groupables = groupableInGroup(g.group);
        return (
          <Box key={g.group} sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 0.5 }}>
              <Box sx={{ width: 4, height: 16, borderRadius: 2, bgcolor: color }} />
              <Typography variant="subtitle2" sx={{ color }}>
                {g.group}
              </Typography>
            </Box>
            {items.map(({ idx, row }) => {
              const def = allSkillDefs.find((d) => d.name === row.defName);
              const isGroupable = !!def?.group;
              const total = skillTotal(row);
              return (
                <Box
                  key={idx}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1.4fr 44px 50px 50px 50px 50px 30px',
                      sm: '1.6fr 48px 56px 56px 56px 56px 48px 48px 32px',
                    },
                    gap: 0.5,
                    alignItems: 'center',
                    px: 1,
                    py: 0.4,
                    borderRadius: 1,
                    '&:hover': { background: 'rgba(47,111,106,0.05)' },
                  }}
                >
                  <Box sx={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontWeight: 500 }}>
                      {row.defName}
                    </Typography>
                    {isGroupable && (
                      <TextField
                        select={!!def?.group?.options.length}
                        value={row.sub || ''}
                        onChange={(e) =>
                          patchRow(idx, {
                            sub: e.target.value,
                            label: e.target.value ? `${row.defName}(${e.target.value})` : row.defName,
                          })
                        }
                        variant="standard"
                        placeholder="子项"
                        sx={{ minWidth: 64, flex: 1 }}
                        InputProps={{ disableUnderline: false }}
                        SelectProps={{ displayEmpty: true }}
                      >
                        <MenuItem value="">
                          <em>子项</em>
                        </MenuItem>
                        {def?.group?.options.map((o) => (
                          <MenuItem key={o} value={o}>
                            {o}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Box>
                  <TextField
                    value={row.init}
                    onChange={(e) => patchRow(idx, { init: numField(e.target.value) })}
                    inputProps={{ style: { textAlign: 'center', padding: '4px 2px' } }}
                  />
                  <TextField
                    value={row.point.pro || ''}
                    onChange={(e) => patchRow(idx, { point: { pro: numField(e.target.value) } })}
                    placeholder="0"
                    inputProps={{ style: { textAlign: 'center', padding: '4px 2px', color: '#2f6f6a' } }}
                  />
                  <TextField
                    value={row.point.interest || ''}
                    onChange={(e) => patchRow(idx, { point: { interest: numField(e.target.value) } })}
                    placeholder="0"
                    inputProps={{ style: { textAlign: 'center', padding: '4px 2px', color: '#b07b2c' } }}
                  />
                  <TextField
                    value={row.point.grow || ''}
                    onChange={(e) => patchRow(idx, { point: { grow: numField(e.target.value) } })}
                    placeholder="0"
                    inputProps={{ style: { textAlign: 'center', padding: '4px 2px' } }}
                  />
                  <Box sx={{ textAlign: 'center', fontWeight: 700, fontSize: 15 }}>{total}</Box>
                  <Box
                    sx={{
                      textAlign: 'center',
                      color: 'text.secondary',
                      fontSize: 13,
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    {half(total)}
                  </Box>
                  <Box
                    sx={{
                      textAlign: 'center',
                      color: 'text.secondary',
                      fontSize: 13,
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    {fifth(total)}
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    {isGroupable && (
                      <IconButton size="small" onClick={() => removeRow(idx)}>
                        <CloseIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              );
            })}
            {groupables.length > 0 && (
              <Stack direction="row" spacing={0.5} sx={{ pl: 1, mt: 0.25 }} flexWrap="wrap" useFlexGap>
                {groupables.map((def) => (
                  <Button
                    key={def.name}
                    size="small"
                    startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                    onClick={() => addSub(def.name)}
                    sx={{ color, fontSize: 12 }}
                  >
                    {def.name}
                  </Button>
                ))}
              </Stack>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
