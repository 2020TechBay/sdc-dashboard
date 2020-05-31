import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

export default function Chart({ title, data, x_axis, y_axis }) {
    const theme = useTheme();
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}>
                    <XAxis dataKey={x_axis.key} stroke={theme.palette.text.secondary}>
                        {x_axis.label &&
                            <Label
                                position="centerBottom"
                                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                            >
                                {x_axis.label}
                            </Label>
                        }
                    </XAxis>
                    <YAxis stroke={theme.palette.text.secondary}>
                        {y_axis.label &&
                            <Label
                                angle={270}
                                position="left"
                                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                            >
                                {y_axis.label}
                            </Label>
                        }
                    </YAxis>
                    <Line type="monotone" dataKey={y_axis.key} stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}