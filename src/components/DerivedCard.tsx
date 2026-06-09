import { Box, Grid2 as Grid, TextField, Typography, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PsychologyIcon from '@mui/icons-material/Psychology';
import type { Character } from '../types';
import { computeDerived } from '../logic/derived';

interface Props {
  character: Character;
  update: (patch: Partial<Character>) => void;
}

function Stat({
  icon,
  label,
  color,
  nowValue,
  onNow,
  maxLabel,
  maxValue,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  nowValue: string;
  onNow: (v: string) => void;
  maxLabel: string;
  maxValue: number | string;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 1.25, borderColor: `${color}55`, background: `${color}0d`, height: '100%' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.75, color }}>
        {icon}
        <Typography variant="subtitle2" sx={{ color }}>
          {label}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
        <TextField
          value={nowValue}
          onChange={(e) => onNow(e.target.value)}
          placeholder={String(maxValue)}
          inputProps={{ style: { textAlign: 'center', fontWeight: 700, fontSize: 20, padding: '4px' } }}
          sx={{ width: 64 }}
        />
        <Typography variant="h6" sx={{ color: 'text.disabled' }}>
          /
        </Typography>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
            {maxValue === undefined || maxValue === '' ? '—' : maxValue}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {maxLabel}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

function Mini({ label, value }: { label: string; value: string | number | undefined }) {
  return (
    <Paper variant="outlined" sx={{ p: 1, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
        {value === undefined || value === '' ? '—' : value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );
}

export default function DerivedCard({ character, update }: Props) {
  const d = computeDerived(character.attributes, Number(character.age) || 0);

  return (
    <Box>
      <Grid container spacing={1.25}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stat
            icon={<FavoriteIcon fontSize="small" />}
            label="体力 HP"
            color="#f4f4f5"
            nowValue={character.hpNow}
            onNow={(v) => update({ hpNow: v })}
            maxLabel="最大"
            maxValue={d.hpMax ?? ''}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stat
            icon={<AutoAwesomeIcon fontSize="small" />}
            label="魔法 MP"
            color="#d4d4d8"
            nowValue={character.mpNow}
            onNow={(v) => update({ mpNow: v })}
            maxLabel="最大"
            maxValue={d.mpMax ?? ''}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stat
            icon={<PsychologyIcon fontSize="small" />}
            label="理智 SAN"
            color="#a1a1aa"
            nowValue={character.sanNow}
            onNow={(v) => update({ sanNow: v })}
            maxLabel="初始"
            maxValue={d.sanStart ?? ''}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Mini label="伤害加值 DB" value={d.db} />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Mini label="体格 Build" value={d.build} />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Mini label="移动 MOV" value={d.mov} />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Paper variant="outlined" sx={{ p: 0.5, textAlign: 'center' }}>
            <TextField
              value={character.armor}
              onChange={(e) => update({ armor: e.target.value })}
              variant="standard"
              inputProps={{ style: { textAlign: 'center', fontWeight: 700, fontSize: 18 } }}
              InputProps={{ disableUnderline: true }}
              placeholder="0"
            />
            <Typography variant="caption" color="text.secondary">
              护甲 Armor
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
