import { Box, Button, Grid2 as Grid, Stack, TextField, Typography, Tooltip } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import ElderlyIcon from '@mui/icons-material/Elderly';
import type { Character, Attributes, AttrKey } from '../types';
import { ATTR_META, rollAttributes, applyAge } from '../logic/attributes';
import { refreshDynamicInits } from '../logic/skills';

interface Props {
  character: Character;
  update: (patch: Partial<Character> | ((c: Character) => Partial<Character>)) => void;
}

export default function AttributesCard({ character, update }: Props) {
  const attrs = character.attributes;

  const setAttrs = (next: Attributes) => {
    update((c) => ({
      attributes: next,
      skills: refreshDynamicInits(c.skills, next),
    }));
  };

  const setOne = (key: AttrKey, value: string) => {
    const v = value === '' ? '' : Math.max(0, Math.min(999, Number(value)));
    setAttrs({ ...attrs, [key]: v });
  };

  const rollAll = () => setAttrs(rollAttributes());

  const onApplyAge = () => {
    const age = Number(character.age);
    if (!age) return;
    setAttrs(applyAge(attrs, age));
  };

  const sum = ATTR_META.filter((m) => m.key !== 'luck').reduce(
    (s, m) => s + (typeof attrs[m.key] === 'number' ? (attrs[m.key] as number) : 0),
    0,
  );

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
        <Button size="small" variant="contained" startIcon={<CasinoIcon />} onClick={rollAll}>
          一键投掷
        </Button>
        <Tooltip title="按当前年龄调整属性（需先填写年龄）">
          <span>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ElderlyIcon />}
              onClick={onApplyAge}
              disabled={!Number(character.age)}
            >
              年龄调整
            </Button>
          </span>
        </Tooltip>
        <Box sx={{ flex: 1 }} />
        <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
          属性总和 <b style={{ color: '#f4f4f5' }}>{sum}</b>
        </Typography>
      </Stack>
      <Grid container spacing={1}>
        {ATTR_META.map((m) => (
          <Grid size={{ xs: 4, sm: 4 }} key={m.key}>
            <TextField
              fullWidth
              type="number"
              label={
                <span>
                  {m.label}
                  <Typography component="span" variant="caption" sx={{ ml: 0.5, opacity: 0.6 }}>
                    {m.en}
                  </Typography>
                </span>
              }
              value={attrs[m.key]}
              onChange={(e) => setOne(m.key, e.target.value)}
              inputProps={{ style: { textAlign: 'center', fontWeight: 700, fontSize: 18 } }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
