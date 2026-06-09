import { Grid2 as Grid, TextField } from '@mui/material';
import type { Character, Backstory } from '../types';

interface Props {
  character: Character;
  update: (patch: Partial<Character>) => void;
}

const fields: { key: keyof Backstory; label: string; full?: boolean }[] = [
  { key: 'appearance', label: '形象描述' },
  { key: 'belief', label: '思想与信念' },
  { key: 'significantPerson', label: '重要之人' },
  { key: 'significantPlace', label: '意义非凡之地' },
  { key: 'treasure', label: '宝贵之物' },
  { key: 'trait', label: '特质' },
  { key: 'injury', label: '伤口与疤痕' },
  { key: 'phobia', label: '恐惧症与狂躁症' },
  { key: 'arcane', label: '法术 / 神器 / 第三类接触', full: true },
  { key: 'description', label: '背景故事 / 个人描述', full: true },
];

export default function BackstoryCard({ character, update }: Props) {
  const bs = character.backstory;
  const set = (key: keyof Backstory, value: string) =>
    update({ backstory: { ...bs, [key]: value } });

  return (
    <Grid container spacing={1.5}>
      {fields.map((f) => (
        <Grid size={{ xs: 12, sm: f.full ? 12 : 6 }} key={f.key}>
          <TextField
            fullWidth
            label={f.label}
            value={bs[f.key]}
            onChange={(e) => set(f.key, e.target.value)}
            multiline
            minRows={f.full ? 2 : 1}
          />
        </Grid>
      ))}
    </Grid>
  );
}
