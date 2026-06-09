import { Grid2 as Grid, TextField } from '@mui/material';
import type { Character, Assets } from '../types';

interface Props {
  character: Character;
  update: (patch: Partial<Character>) => void;
}

const fields: { key: keyof Assets; label: string; full?: boolean }[] = [
  { key: 'cash', label: '现金' },
  { key: 'spending', label: '消费水平' },
  { key: 'assets', label: '资产', full: true },
  { key: 'items', label: '随身物品 / 装备', full: true },
];

export default function AssetsCard({ character, update }: Props) {
  const a = character.assets;
  const set = (key: keyof Assets, value: string) => update({ assets: { ...a, [key]: value } });

  return (
    <Grid container spacing={1.5}>
      {fields.map((f) => (
        <Grid size={{ xs: 12, sm: f.full ? 12 : 6 }} key={f.key}>
          <TextField
            fullWidth
            label={f.label}
            value={a[f.key]}
            onChange={(e) => set(f.key, e.target.value)}
            multiline={f.full}
            minRows={f.full ? 2 : 1}
          />
        </Grid>
      ))}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="人物关系"
          value={character.friends}
          onChange={(e) => update({ friends: e.target.value })}
          multiline
          minRows={2}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="经历过的模组"
          value={character.experiences}
          onChange={(e) => update({ experiences: e.target.value })}
          multiline
          minRows={2}
        />
      </Grid>
    </Grid>
  );
}
