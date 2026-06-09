import { useState } from 'react';
import {
  Box,
  Grid2 as Grid,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Tooltip,
  Menu,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import type { Character } from '../types';
import { occupations } from '../data/occupations';
import { generateName } from '../data/names';
import AvatarCard from './AvatarCard';

interface Props {
  character: Character;
  update: (patch: Partial<Character>) => void;
}

export default function BasicInfo({ character, update }: Props) {
  const [nameMenu, setNameMenu] = useState<null | HTMLElement>(null);
  const gender = character.gender === '女' ? '女' : '男';

  const field = (key: keyof Character, label: string, props: object = {}) => (
    <TextField
      fullWidth
      label={label}
      value={(character[key] as string) ?? ''}
      onChange={(e) => update({ [key]: e.target.value })}
      {...props}
    />
  );

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
      <Box sx={{ flex: '0 0 auto', mx: { xs: 'auto', sm: 0 } }}>
        <AvatarCard character={character} update={update} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 240 }}>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="调查员姓名"
              value={character.name}
              onChange={(e) => update({ name: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="随机生成姓名">
                      <IconButton size="small" edge="end" onClick={(e) => setNameMenu(e.currentTarget)}>
                        <CasinoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <Menu anchorEl={nameMenu} open={!!nameMenu} onClose={() => setNameMenu(null)}>
              {(['中文', '西式'] as const).map((style) => (
                <MenuItem
                  key={style}
                  onClick={() => {
                    update({ name: generateName(style, gender) });
                    setNameMenu(null);
                  }}
                >
                  随机{style}姓名（{gender}）
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>{field('player', '玩家名')}</Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <TextField
              select
              fullWidth
              label="职业"
              value={character.occupation}
              onChange={(e) => update({ occupation: e.target.value })}
            >
              <MenuItem value="">
                <em>未选择</em>
              </MenuItem>
              {occupations.map((o) => (
                <MenuItem key={o.name} value={o.name}>
                  {o.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 3, sm: 2 }}>{field('age', '年龄', { type: 'number' })}</Grid>
          <Grid size={{ xs: 3, sm: 2 }}>
            <TextField
              select
              fullWidth
              label="性别"
              value={gender}
              onChange={(e) => update({ gender: e.target.value })}
            >
              <MenuItem value="男">男</MenuItem>
              <MenuItem value="女">女</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>{field('residence', '居住地')}</Grid>
          <Grid size={{ xs: 6, sm: 6 }}>{field('hometown', '故乡')}</Grid>
        </Grid>
      </Box>
    </Box>
  );
}
