import { useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  useMediaQuery,
  Snackbar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CasinoIcon from '@mui/icons-material/Casino';
import ImageIcon from '@mui/icons-material/Image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { Character } from '../types';
import { createCharacter } from '../logic/character';

interface Props {
  character: Character;
  replace: (c: Character) => void;
  reset: () => void;
  onOpenDice: () => void;
  onExportImage: () => void;
  exporting: boolean;
}

export default function TopBar({
  character,
  replace,
  reset,
  onOpenDice,
  onExportImage,
  exporting,
}: Props) {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('md'));
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState('');

  const exportJSON = () => {
    // 把体积巨大的头像 base64 放到末尾，方便打开文件时一眼看清其它字段
    const { avatar, ...rest } = character;
    const ordered = { ...rest, ...(avatar !== undefined ? { avatar } : {}) };
    const blob = new Blob([JSON.stringify(ordered, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name || '调查员'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast('已导出 JSON 存档');
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as Character;
        replace({ ...createCharacter(), ...data });
        setToast('存档导入成功');
      } catch {
        setToast('导入失败：文件格式不正确');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const onReset = () => {
    if (window.confirm('确定要清空当前人物卡并重置吗？此操作不可撤销。')) {
      reset();
      setToast('已重置');
    }
    setMenu(null);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        background: 'rgba(13,13,15,0.82)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.14)',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <AutoStoriesIcon sx={{ color: 'primary.main' }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ lineHeight: 1.1, fontWeight: 700 }} noWrap>
            COC 调查员车卡工具
          </Typography>
          {!compact && (
            <Typography variant="caption" color="text.secondary">
              Call of Cthulhu 7th Edition · 人物卡生成器
            </Typography>
          )}
        </Box>

        <Tooltip title="骰子工具">
          <IconButton onClick={onOpenDice} color="primary">
            <CasinoIcon />
          </IconButton>
        </Tooltip>

        <Button
          variant="contained"
          startIcon={<ImageIcon />}
          onClick={onExportImage}
          disabled={exporting}
        >
          {exporting ? '生成中…' : compact ? '导出' : '导出图片'}
        </Button>

        <input ref={fileRef} type="file" accept="application/json" hidden onChange={importJSON} />
        <Tooltip title="更多">
          <IconButton onClick={(e) => setMenu(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={menu} open={!!menu} onClose={() => setMenu(null)}>
          <MenuItem
            onClick={() => {
              exportJSON();
              setMenu(null);
            }}
          >
            <FileDownloadIcon fontSize="small" sx={{ mr: 1 }} /> 导出 JSON 存档
          </MenuItem>
          <MenuItem
            onClick={() => {
              fileRef.current?.click();
              setMenu(null);
            }}
          >
            <FileUploadIcon fontSize="small" sx={{ mr: 1 }} /> 导入 JSON 存档
          </MenuItem>
          <MenuItem onClick={onReset}>
            <RestartAltIcon fontSize="small" sx={{ mr: 1 }} /> 重置人物卡
          </MenuItem>
        </Menu>
      </Toolbar>
      <Snackbar
        open={!!toast}
        autoHideDuration={2500}
        onClose={() => setToast('')}
        message={toast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </AppBar>
  );
}
