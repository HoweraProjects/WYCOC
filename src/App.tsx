import { useRef, useState } from 'react';
import { Box, Container, Grid2 as Grid, Typography, Link, Stack } from '@mui/material';
import { toPng } from 'html-to-image';
import PersonIcon from '@mui/icons-material/Person';
import CasinoIcon from '@mui/icons-material/Casino';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import GavelIcon from '@mui/icons-material/Gavel';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InventoryIcon from '@mui/icons-material/Inventory2';

import { useCharacter } from './hooks/useCharacter';
import TopBar from './components/TopBar';
import SectionCard from './components/SectionCard';
import BasicInfo from './components/BasicInfo';
import AttributesCard from './components/AttributesCard';
import DerivedCard from './components/DerivedCard';
import SkillsCard from './components/SkillsCard';
import WeaponsCard from './components/WeaponsCard';
import BackstoryCard from './components/BackstoryCard';
import AssetsCard from './components/AssetsCard';
import DiceRollerDialog from './components/DiceRollerDialog';

export default function App() {
  const { character, update, reset, replace } = useCharacter();
  const [diceOpen, setDiceOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const exportImage = async () => {
    if (!sheetRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(sheetRef.current, {
        pixelRatio: 2,
        backgroundColor: '#eef1f0',
        cacheBust: true,
        filter: (node) =>
          !(node instanceof HTMLElement && node.dataset.noexport === 'true'),
      });
      const a = document.createElement('a');
      a.download = `${character.name || '调查员'}-人物卡.png`;
      a.href = dataUrl;
      a.click();
    } catch (err) {
      console.error(err);
      alert('图片导出失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 6 }}>
      <TopBar
        character={character}
        replace={replace}
        reset={reset}
        onOpenDice={() => setDiceOpen(true)}
        onExportImage={exportImage}
        exporting={exporting}
      />

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Box ref={sheetRef} sx={{ p: { xs: 0, sm: 1 } }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <SectionCard title="基础信息" subtitle="INVESTIGATOR" icon={<PersonIcon />}>
                <BasicInfo character={character} update={update} />
              </SectionCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <SectionCard title="属性" subtitle="CHARACTERISTICS" icon={<AutoGraphIcon />}>
                <AttributesCard character={character} update={update} />
              </SectionCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionCard title="衍生属性 / 战斗" subtitle="DERIVED & COMBAT" icon={<CasinoIcon />}>
                <DerivedCard character={character} update={update} />
              </SectionCard>
            </Grid>

            <Grid size={12}>
              <SectionCard
                title="技能"
                subtitle="SKILLS"
                icon={<PsychologyAltIcon />}
                dense
              >
                <SkillsCard character={character} update={update} />
              </SectionCard>
            </Grid>

            <Grid size={12}>
              <SectionCard title="武器 / 战斗" subtitle="WEAPONS" icon={<GavelIcon />}>
                <WeaponsCard character={character} update={update} />
              </SectionCard>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <SectionCard title="背景故事" subtitle="BACKSTORY" icon={<MenuBookIcon />}>
                <BackstoryCard character={character} update={update} />
              </SectionCard>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <SectionCard title="资产 / 关系 / 经历" subtitle="ASSETS & TIES" icon={<InventoryIcon />}>
                <AssetsCard character={character} update={update} />
              </SectionCard>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }} data-noexport="true">
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              数据自动保存在本地浏览器
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            COC 调查员车卡工具 · 基于 Material UI 构建 ·{' '}
            <Link href="https://github.com/" target="_blank" rel="noopener" underline="hover">
              开源项目
            </Link>
            。Call of Cthulhu 为 Chaosium Inc. 所有，本工具仅供爱好者使用。
          </Typography>
        </Box>
      </Container>

      <DiceRollerDialog open={diceOpen} onClose={() => setDiceOpen(false)} />
    </Box>
  );
}
