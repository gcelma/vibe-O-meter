import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';
import client from '../../client';
import { USER_POLLS } from '../Polls/Polls.query';
import './Chart.sass';

class Chart extends Component {
  state = { data: null };

    componentDidMount() {
      client.watchQuery({ query: USER_POLLS }).subscribe({
        next: ({ data }) => {
          this.transformData(data.getUserPolls);
          // polls.unsubscribe();
        },
        error: (e) => console.log(e)
      });
    }  

    transformData = (data) => {
      const trasformedData = [
        {
          id: "good",
          color: "hsl(6, 70%, 50%)",
          data: []
        },
        {
          id: "mid",
          color: "hsl(26, 70%, 50%)",
          data: []
        },
        {
          id: "bad",
          color: "hsl(85, 70%, 50%)",
          data: []
        }
      ];

      let test = data.map(poll => {
        let entryGood = { x: poll.name, y: poll.good };
        let entryMid = { x: poll.name, y: poll.mid };
        let entryBad = { x: poll.name, y: poll.bad };

        trasformedData[0].data.push(entryGood);
        trasformedData[1].data.push(entryMid);
        trasformedData[2].data.push(entryBad);
      });

      this.setState({ data: trasformedData });
    };

    render() {
        const { state: { data } } = this;

        return <div className="Chart">
          { data ? 
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Polls',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Votes',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'nivo' }}
            pointSize={10}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            enableSlices="x"
            crosshairType="x"
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        /> : <p>No polls yet</p>}
        </div>
    }
}

export default Chart;


    