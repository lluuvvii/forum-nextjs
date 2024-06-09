import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import dynamic from "next/dynamic";
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab, Collapse, Box, CircularProgress } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar, IconTags } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import axios from '@/lib/axios'
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MonthlyEarnings = () => {
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // const { data, error, isLoading } = useQuery(['forums'], fetchForumData);
  const { data: forumQuery, refetch: refetchForumQuery, isLoading: isLoadingForumQuery, isSuccess: isSuccessForumQuery, isError: isErrorForumQuery } = useQuery({
    queryKey: ['forum-data'],
    queryFn: async () => {
      const response = await axios.get('/api/forum')

      return response.data.data
    }
  })

  const [totalTags, setTotalTags] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (forumQuery) {
      let total = 0;
      const tagCounts: any = [];
      forumQuery.forEach((forum: any) => {
        const count = forum.forum_tags.length;
        total += count;

        tagCounts.push(count);
      });
      setTotalTags(total);
      setChartData(tagCounts);
    }
  }, [forumQuery]);

  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const seriescolumnchart = [
    {
      name: 'jumlah',
      color: secondary,
      data: chartData,
    },
  ];

  return (
    <DashboardCard
      title="Forum Tag"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <IconTags width={24} />
        </Fab>
      }
    // footer={
    //   <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={60} width={"100%"} />
    // }
    >
      <>
        {isLoadingForumQuery && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
            // position="absolute"
            top={0}
            left={0}
            bgcolor="rgba(255, 255, 255, 0.8)"
          // zIndex={1}
          >
            <CircularProgress />
          </Box>
        )}
        <Collapse in={isSuccessForumQuery} timeout={1000}>
          <Typography variant="h3" fontWeight="700" mt="-20px">
            Total Tag : {totalTags}
          </Typography>
          <Stack direction="row" spacing={1} my={1} alignItems="center">
            <Typography variant="subtitle2" fontWeight="600">
              jumlah tag di tiap forum
            </Typography>
          </Stack>
          <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={70} width={"100%"} />
        </Collapse>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;


// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import { useTheme } from '@mui/material/styles';
// import { Stack, Typography, Avatar, Fab } from '@mui/material';
// import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
// import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

// const MonthlyEarnings = () => {
//   // chart color
//   const theme = useTheme();
//   const secondary = theme.palette.secondary.main;
//   const secondarylight = '#f5fcff';
//   const errorlight = '#fdede8';

//   // chart
//   const optionscolumnchart: any = {
//     chart: {
//       type: 'area',
//       fontFamily: "'Plus Jakarta Sans', sans-serif;",
//       foreColor: '#adb0bb',
//       toolbar: {
//         show: false,
//       },
//       height: 60,
//       sparkline: {
//         enabled: true,
//       },
//       group: 'sparklines',
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 2,
//     },
//     fill: {
//       colors: [secondarylight],
//       type: 'solid',
//       opacity: 0.05,
//     },
//     markers: {
//       size: 0,
//     },
//     tooltip: {
//       theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
//     },
//   };
//   const seriescolumnchart: any = [
//     {
//       name: '',
//       color: secondary,
//       data: [25, 66, 20, 40, 12, 58, 20],
//     },
//   ];

//   return (
//     <DashboardCard
//       title="Monthly Earnings"
//       action={
//         <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
//           <IconCurrencyDollar width={24} />
//         </Fab>
//       }
//       footer={
//         <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={60} width={"100%"} />
//       }
//     >
//       <>
//         <Typography variant="h3" fontWeight="700" mt="-20px">
//           $6,820
//         </Typography>
//         <Stack direction="row" spacing={1} my={1} alignItems="center">
//           <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
//             <IconArrowDownRight width={20} color="#FA896B" />
//           </Avatar>
//           <Typography variant="subtitle2" fontWeight="600">
//             +9%
//           </Typography>
//           <Typography variant="subtitle2" color="textSecondary">
//             last year
//           </Typography>
//         </Stack>
//       </>
//     </DashboardCard>
//   );
// };

// export default MonthlyEarnings;
