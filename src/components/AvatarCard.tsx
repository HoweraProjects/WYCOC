import { useRef } from 'react';
import { Box, Button, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type { Character } from '../types';

interface Props {
  character: Character;
  update: (patch: Partial<Character>) => void;
}

export default function AvatarCard({ character, update }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ avatar: String(reader.result) });
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <Stack alignItems="center" spacing={1.5} sx={{ width: '100%' }}>
      {character.avatar ? (
        // 完整显示图片，按原始比例自适应，不裁剪
        <Box
          component="img"
          src={character.avatar}
          alt="头像"
          sx={{
            display: 'block',
            maxWidth: { xs: 160, sm: 200 },
            maxHeight: 300,
            width: 'auto',
            height: 'auto',
            borderRadius: 2,
            border: '2px solid rgba(255,255,255,0.22)',
            objectFit: 'contain',
          }}
        />
      ) : (
        <Box
          sx={{
            width: 132,
            height: 132,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.06)',
            color: 'primary.main',
            border: '2px solid rgba(255,255,255,0.22)',
          }}
        >
          <PersonIcon sx={{ fontSize: 64 }} />
        </Box>
      )}

      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" useFlexGap>
        <Button
          size="small"
          variant="outlined"
          startIcon={<PhotoCameraIcon />}
          onClick={() => inputRef.current?.click()}
        >
          {character.avatar ? '更换头像' : '上传头像'}
        </Button>
        {character.avatar && (
          <Button
            size="small"
            color="inherit"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => update({ avatar: undefined })}
          >
            移除
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
