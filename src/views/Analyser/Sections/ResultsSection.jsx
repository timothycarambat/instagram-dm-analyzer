import React from "react";
import {Line, Doughnut} from "react-chartjs-2";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Forum from "@material-ui/icons/Forum";
import Chat from "@material-ui/icons/Chat";
import Textsms from "@material-ui/icons/Textsms";
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";



// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";

class ResultsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  countConversations = () => {
    const data = this.props.data
    return data.length
  }

  getUniqueParticipants = () => {
    const data = this.props.data
    let uniqueUsers = []

    data.map((record) => {
    	record.participants.map((user) => {
    		if (!uniqueUsers.includes(user)) {
    			uniqueUsers.push(user)
        }
    	})
    })

    return uniqueUsers.length
  }

  countMessages = () => {
    const data = this.props.data
    let msgCount = 0

    data.map((record) => {
    	msgCount += record.conversation.length
    })

    return msgCount
  }

  countMsgsByType = (type) => {
    const data = this.props.data
    let msgCount = 0

    data.map((record) => {
      record.conversation.map((convo) => {
        if (type === 'text'){
          if (convo.text) {
            msgCount++
          }
        } else {
          if (convo.media) {
            msgCount++
          }
        }
      })
    })

    return msgCount
  }

  makeMsgTimeData = () => {
    const data = this.props.data
    var chartData = []
    var labels = []
    var dataPoints = []

    for(let i=0;i<24;i++) {
      let hour = i
      let meridian = hour >= 12 ? 'PM' : 'AM'
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      chartData.push({
        name: `${hour}:00 ${meridian}`,
        count: 0
      })
    }

    data.map((record) => {
      record.conversation.map((convo) => {
        let createdAt = new Date(convo.created_at)
        let hour = createdAt.getHours()
        chartData[hour].count = chartData[hour].count + 1
      })
    })

    chartData.map((time) => labels.push(time.name))
    chartData.map((time) => dataPoints.push(time.count))

    return({
      labels: labels,
    	datasets: [
    		{
    			label: "Time of Messages",
    			backgroundColor: "rgba(89,125,255,0.2)",
    			borderColor: "rgba(16,49,168,1)",
    			pointBackgroundColor: "rgba(0,0,0,1)",
    			data: dataPoints
    		}
    	]
    })
  }

  lineChartOptions = () => {
    return(
    	{scaleShowGridLines : true,
    	scaleGridLineColor : "rgba(0,0,0,.05)",
    	scaleGridLineWidth : 1,
    	scaleShowHorizontalLines: true,
    	scaleShowVerticalLines: true,
    	bezierCurve : true,
    	bezierCurveTension : 0.4,
    	pointDot : true,
    	pointDotRadius : 4,
    	pointDotStrokeWidth : 1,
    	pointHitDetectionRadius : 20,
    	datasetStroke : true,
    	datasetStrokeWidth : 2,
    	datasetFill : true,
    	offsetGridLines : false}
    )
  }

  makeSenderQtyData = () => {
    const data = this.props.data
    var senderData = {}

    data.map((record) => {
      record.conversation.map((convo) => {
        let sender = convo.sender
        senderData[sender] = senderData[sender] != undefined ? senderData[sender]+1 : 0
      })
    })

    return({
    	labels: Object.keys(senderData),
    	datasets: [{
    		data: Object.values(senderData),
    		backgroundColor: [
    		'#FF6384',
    		'#36A2EB',
    		'#FFCE56'
    		],
    		hoverBackgroundColor: [
    		'#FF6384',
    		'#36A2EB',
    		'#FFCE56'
    		]
    	}],
    })
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Here is what we found.</h2>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem cs={3} sm={3} md={3}>
            <InfoArea
                title="Conversations"
                description={`You had ${this.countConversations()} conversations involving ${this.getUniqueParticipants()} different participants!`}
                icon={Forum}
                iconColor="info">
            </InfoArea>
          </GridItem>

          <GridItem cs={3} sm={3} md={3}>
            <InfoArea
                title="Messages"
                description={`Total Amount of Messages (sent/recieved): ${this.countMessages()}`}
                icon={Chat}
                iconColor="info">
            </InfoArea>
          </GridItem>

          <GridItem cs={3} sm={3} md={3}>
            <InfoArea
                title="Texts Messages"
                description={`Text Messages: ${this.countMsgsByType('text')}`}
                icon={Textsms}
                iconColor="info">
            </InfoArea>
          </GridItem>

          <GridItem cs={3} sm={3} md={3}>
            <InfoArea
                title="Media Messages"
                description={`Media Messages: ${this.countMsgsByType('media')}`}
                icon={PlayCircleFilled}
                iconColor="info">
            </InfoArea>
          </GridItem>

        </GridContainer>

        <GridContainer>
          <GridItem cs={6} sm={6} md={6}>
            <Line
              data={this.makeMsgTimeData()}
              options={this.lineChartOptions()}
            />
          </GridItem>

          <GridItem cs={6} sm={6} md={6}>
            <Doughnut
              data={this.makeSenderQtyData()}
              options={{
                legend: {
                  display: false
                },
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          </GridItem>
        </GridContainer>

      </div>
    );
  }
}

export default withStyles(workStyle)(ResultsSection);
