import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { rollExpr } from '../logic/dice';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Entry {
  expr: string;
  rolls: number[];
  total: number;
}

const presets = ['1D100', '1D20', '1D10', '1D8', '1D6', '1D4', '3D6', '2D6+6'];

export default function DiceRollerDialog({ open, onClose }: Props) {
  const [expr, setExpr] = useState('1D100');
  const [history, setHistory] = useState<Entry[]>([]);

  const doRoll = (e: string) => {
    const r = rollExpr(e);
    if (!r.ok) return;
    setHistory((h) => [{ expr: e, rolls: r.rolls, total: r.total }, ...h].slice(0, 12));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CasinoIcon color="primary" /> 骰子工具
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <TextField
            fullWidth
            label="骰子表达式"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && doRoll(expr)}
            placeholder="例如 2D6+3"
          />
          <Button variant="contained" onClick={() => doRoll(expr)} startIcon={<CasinoIcon />}>
            投掷
          </Button>
        </Stack>
        <Box sx={{ mb: 1.5 }}>
          {presets.map((p) => (
            <Chip
              key={p}
              label={p}
              size="small"
              onClick={() => {
                setExpr(p);
                doRoll(p);
              }}
              sx={{ m: 0.25 }}
              variant="outlined"
            />
          ))}
        </Box>
        <Divider sx={{ mb: 1 }} />
        {history.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            尚未投掷
          </Typography>
        ) : (
          <Stack spacing={0.5}>
            {history.map((h, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1,
                  borderRadius: 1,
                  background: i === 0 ? 'rgba(255,255,255,0.08)' : 'transparent',
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {h.expr}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    [{h.rolls.join(', ')}]
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
                  {h.total}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
