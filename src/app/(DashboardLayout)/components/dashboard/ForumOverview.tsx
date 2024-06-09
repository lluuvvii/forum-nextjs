import React, { useEffect, useState } from 'react';
import { Select, MenuItem, Box, CircularProgress, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { useQuery } from 'react-query';
import axios from '@/lib/axios'
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const ForumOverview = () => {
    const [month, setMonth] = useState('1');
    const [chartData, setChartData] = useState({ categories: [], series: [] });

    const { data: forumQuery, refetch: refetchForumQuery, isLoading: isLoadingForumQuery, isSuccess: isSuccessForumQuery, isError: isErrorForumQuery } = useQuery({
        queryKey: ['forum-data'],
        queryFn: async () => {
            const response = await axios.get('/api/forum')

            return response.data.data
        }
    })

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    useEffect(() => {
        if (forumQuery) {
            const processData = (data: any) => {
                const counts: any = {};
                forumQuery.forEach((item: any) => {
                    const date = new Date(item.created_at).toLocaleDateString();
                    if (counts[date]) {
                        counts[date]++;
                    } else {
                        counts[date] = 1;
                    }
                });

                const categories: any = Object.keys(counts);
                const series: any = [{
                    name: 'Forum Created',
                    data: Object.values(counts)
                }];

                setChartData({ categories, series });
            };

            processData(forumQuery);  // Ubah sesuai dengan struktur data API Anda
        }
    }, [forumQuery]);

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: 6,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: chartData.categories,
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };

    return (
        <DashboardCard title="Overview Forum">
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
                {/* <Select value={month} onChange={handleChange}>
                <MenuItem value="1">January</MenuItem>
                <MenuItem value="2">February</MenuItem>
            </Select> */}
                <Collapse in={isSuccessForumQuery} timeout={1000}>
                    <Chart
                        options={options}
                        series={chartData.series}
                        type="bar"
                        height={380}
                        width={"100%"}
                    />
                </Collapse>
            </>
        </DashboardCard>
    );
};

export default ForumOverview;

// import React from 'react';
// import { Select, MenuItem } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


// const SalesOverview = () => {

//     // select
//     const [month, setMonth] = React.useState('1');

//     const handleChange = (event: any) => {
//         setMonth(event.target.value);
//     };

//     // chart color
//     const theme = useTheme();
//     const primary = theme.palette.primary.main;
//     const secondary = theme.palette.secondary.main;

//     // chart
//     const optionscolumnchart: any = {
//         chart: {
//             type: 'bar',
//             fontFamily: "'Plus Jakarta Sans', sans-serif;",
//             foreColor: '#adb0bb',
//             toolbar: {
//                 show: true,
//             },
//             height: 370,
//         },
//         colors: [primary, secondary],
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 barHeight: '60%',
//                 columnWidth: '42%',
//                 borderRadius: [6],
//                 borderRadiusApplication: 'end',
//                 borderRadiusWhenStacked: 'all',
//             },
//         },

//         stroke: {
//             show: true,
//             width: 5,
//             lineCap: "butt",
//             colors: ["transparent"],
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         legend: {
//             show: false,
//         },
//         grid: {
//             borderColor: 'rgba(0,0,0,0.1)',
//             strokeDashArray: 3,
//             xaxis: {
//                 lines: {
//                     show: false,
//                 },
//             },
//         },
//         yaxis: {
//             tickAmount: 4,
//         },
//         xaxis: {
//             categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
//             axisBorder: {
//                 show: false,
//             },
//         },
//         tooltip: {
//             theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
//             fillSeriesColor: false,
//         },
//     };
//     const seriescolumnchart: any = [
//         {
//             name: 'Eanings this month',
//             data: [355, 390, 300, 350, 390, 180, 355, 390],
//         },
//         {
//             name: 'Expense this month',
//             data: [280, 250, 325, 215, 250, 310, 280, 250],
//         },
//     ];

//     return (

//         <DashboardCard title="Overview Forum">
//             <Chart
//                 options={optionscolumnchart}
//                 series={seriescolumnchart}
//                 type="bar"
//                 height={370}
//                 width={"100%"}
//             />
//         </DashboardCard>
//     );
// };

// export default SalesOverview;
