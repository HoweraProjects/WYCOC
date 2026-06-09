import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import type { Character, Weapon } from '../types';

interface Props {
  character: Character;
  update: (patch: Partial<Character>) => void;
}

const cols: { key: keyof Weapon; label: string; w: string }[] = [
  { key: 'name', label: '武器', w: '1.4fr' },
  { key: 'skill', label: '技能', w: '1fr' },
  { key: 'damage', label: '伤害', w: '1fr' },
  { key: 'range', label: '射程', w: '0.8fr' },
  { key: 'attacks', label: '次数', w: '0.6fr' },
  { key: 'ammo', label: '弹量', w: '0.6fr' },
  { key: 'malfunction', label: '故障', w: '0.6fr' },
];

export default function WeaponsCard({ character, update }: Props) {
  const weapons = character.weapons;

  const patch = (idx: number, key: keyof Weapon, value: string) => {
    const next = weapons.slice();
    next[idx] = { ...next[idx], [key]: value };
    update({ weapons: next });
  };

  const add = () => {
    update({
      weapons: [
        ...weapons,
        { name: '', skill: '', damage: '', range: '', attacks: '', ammo: '', malfunction: '' },
      ],
    });
  };

  const remove = (idx: number) => {
    update({ weapons: weapons.filter((_, i) => i !== idx) });
  };

  const template = `${cols.map((c) => c.w).join(' ')} 32px`;

  return (
    <Box>
      <Box
        sx={{
          display: { xs: 'none', sm: 'grid' },
          gridTemplateColumns: template,
          gap: 0.5,
          px: 0.5,
          mb: 0.5,
          color: 'text.secondary',
          fontSize: 12,
        }}
      >
        {cols.map((c) => (
          <span key={c.key}>{c.label}</span>
        ))}
        <span />
      </Box>
      {weapons.map((w, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr 32px', sm: template },
            gap: 0.5,
            mb: 0.5,
            alignItems: 'center',
          }}
        >
          {cols.map((c) => (
            <TextField
              key={c.key}
              value={w[c.key]}
              placeholder={c.label}
              onChange={(e) => patch(idx, c.key, e.target.value)}
              inputProps={{ style: { padding: '6px 8px', fontSize: 13 } }}
            />
          ))}
          <IconButton size="small" onClick={() => remove(idx)}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      ))}
      <Button size="small" startIcon={<AddIcon />} onClick={add} sx={{ mt: 0.5 }}>
        添加武器
      </Button>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
        伤害可填写 DB 占位，如 <code>1D4+DB</code>
      </Typography>
    </Box>
  );
}
