import { useRef } from 'react';
import { Avatar, Box, Button, Stack } from '@mui/material';
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
    <Stack alignItems="center" spacing={1.5}>
      <Avatar
        src={character.avatar}
        variant="rounded"
        sx={{
          width: 132,
          height: 132,
          bgcolor: 'rgba(47,111,106,0.10)',
          color: 'primary.main',
          border: '2px solid rgba(47,111,106,0.2)',
        }}
      >
        <PersonIcon sx={{ fontSize: 64 }} />
      </Avatar>
      <Box>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<PhotoCameraIcon />}
            onClick={() => inputRef.current?.click()}
          >
            上传头像
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
      </Box>
    </Stack>
  );
}
