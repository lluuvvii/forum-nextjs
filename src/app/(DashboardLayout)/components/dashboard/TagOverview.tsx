import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Box, CircularProgress, Collapse } from '@mui/material';
import { IconTag } from '@tabler/icons-react';
import axios from '@/lib/axios'

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const YearlyBreakup = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;
  const [totalTags, setTotalTags] = useState(0)

  // const { data, error, isLoading } = useQuery(['forums'], fetchForumData);
  const { data: forumQuery, refetch: refetchForumQuery, isLoading: isLoadingForumQuery, isSuccess: isSuccessForumQuery, isError: isErrorForumQuery } = useQuery({
    queryKey: ['forum-data'],
    queryFn: async () => {
      const response = await axios.get('/api/forum')

      return response.data.data
    }
  })

  const [chartData, setChartData] = useState<{ labels: string[], series: number[] }>({ labels: [], series: [] });

  useEffect(() => {
    if (forumQuery) {
      let countTags = 0
      const tagCounts: { [key: string]: number } = {};
      forumQuery.forEach((forum: any) => {
        if (totalTags !== forum.forum_tags.length) {
          setTotalTags(countTags += forum.forum_tags.length)
        }
        forum.forum_tags.forEach((tag: any) => {
          const tagName = tag.tag.name;
          if (tagCounts[tagName]) {
            tagCounts[tagName]++;
          } else {
            tagCounts[tagName] = 1;
          }
        });
      });

      const labels = Object.keys(tagCounts);
      const series = Object.values(tagCounts);

      setChartData({ labels, series });
    }
  }, [forumQuery]);

  const optionscolumnchart: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: ['#0000ff', '#f6ff00', '#ff0000', '#ffe600'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: chartData.labels,
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <DashboardCard title="Overview Tag">
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
          <Grid container spacing={1}>
            {/* column */}
            <Grid item xs={6} sm={6}>
              <Typography variant="h3" fontWeight="700">
                {totalTags}
              </Typography>
              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                  <IconTag width={20} color="#39B69A" />
                </Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  {totalTags} Total tag
                </Typography>
              </Stack>
            </Grid>
            {/* column */}
            <Grid item xs={6}>
              <Chart
                options={optionscolumnchart}
                series={chartData.series}
                type="donut"
                height={150}
                width={"100%"}
              />
            </Grid>
          </Grid>
        </Collapse>
      </>
    </DashboardCard>
  );
};

export default YearlyBreakup;


// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import { useTheme } from '@mui/material/styles';
// import { Grid, Stack, Typography, Avatar } from '@mui/material';
// import { IconArrowUpLeft } from '@tabler/icons-react';

// import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

// const YearlyBreakup = () => {
//   // chart color
//   const theme = useTheme();
//   const primary = theme.palette.primary.main;
//   const primarylight = '#ecf2ff';
//   const successlight = theme.palette.success.light;

//   // chart
//   const optionscolumnchart: any = {
//     chart: {
//       type: 'donut',
//       fontFamily: "'Plus Jakarta Sans', sans-serif;",
//       foreColor: '#adb0bb',
//       toolbar: {
//         show: false,
//       },
//       height: 155,
//     },
//     colors: [primary, primarylight, '#F9F9FD'],
//     plotOptions: {
//       pie: {
//         startAngle: 0,
//         endAngle: 360,
//         donut: {
//           size: '75%',
//           background: 'transparent',
//         },
//       },
//     },
//     tooltip: {
//       theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
//       fillSeriesColor: false,
//     },
//     stroke: {
//       show: false,
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     legend: {
//       show: false,
//     },
//     responsive: [
//       {
//         breakpoint: 991,
//         options: {
//           chart: {
//             width: 120,
//           },
//         },
//       },
//     ],
//   };
//   const seriescolumnchart: any = [38, 40, 25];

//   return (
//     <DashboardCard title="Yearly Breakup">
//       <Grid container spacing={3}>
//         {/* column */}
//         <Grid item xs={7} sm={7}>
//           <Typography variant="h3" fontWeight="700">
//             $36,358
//           </Typography>
//           <Stack direction="row" spacing={1} mt={1} alignItems="center">
//             <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
//               <IconArrowUpLeft width={20} color="#39B69A" />
//             </Avatar>
//             <Typography variant="subtitle2" fontWeight="600">
//               +9%
//             </Typography>
//             <Typography variant="subtitle2" color="textSecondary">
//               last year
//             </Typography>
//           </Stack>
//           <Stack spacing={3} mt={5} direction="row">
//             <Stack direction="row" spacing={1} alignItems="center">
//               <Avatar
//                 sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
//               ></Avatar>
//               <Typography variant="subtitle2" color="textSecondary">
//                 2022
//               </Typography>
//             </Stack>
//             <Stack direction="row" spacing={1} alignItems="center">
//               <Avatar
//                 sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
//               ></Avatar>
//               <Typography variant="subtitle2" color="textSecondary">
//                 2023
//               </Typography>
//             </Stack>
//           </Stack>
//         </Grid>
//         {/* column */}
//         <Grid item xs={5} sm={5}>
//           <Chart
//             options={optionscolumnchart}
//             series={seriescolumnchart}
//             type="donut"
//             height={150}
//             width={"100%"}
//           />
//         </Grid>
//       </Grid>
//     </DashboardCard>
//   );
// };

// export default YearlyBreakup;
