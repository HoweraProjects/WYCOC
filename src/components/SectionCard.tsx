import type { ReactNode } from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

interface Props {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  dense?: boolean;
}

export default function SectionCard({ title, subtitle, icon, action, children, dense }: Props) {
  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1.25,
          background: 'linear-gradient(90deg, rgba(47,111,106,0.10), rgba(47,111,106,0.02))',
          borderBottom: '1px solid rgba(47,111,106,0.12)',
        }}
      >
        {icon && <Box sx={{ display: 'flex', color: 'primary.main' }}>{icon}</Box>}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {action}
      </Box>
      <CardContent sx={{ p: dense ? 1.5 : 2, '&:last-child': { pb: dense ? 1.5 : 2 } }}>
        {children}
      </CardContent>
    </Card>
  );
}
