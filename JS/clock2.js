function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Countdown extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      days: undefined,
      hours: undefined,
      minutes: undefined,
      seconds: undefined });}


  componentDidMount() {
    this.interval = setInterval(() => {
      const { timeTillDate, timeFormat } = this.props;
      const then = moment(timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format('D');
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');
      this.setState({ days, hours, minutes, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    const daysRadius = mapNumber(days, 30, 0, 0, 360);
    const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
    const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
    const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

    return (
      React.createElement("div", null,
      React.createElement("div", { className: "countdown-wrapper" },
      days &&
      React.createElement("div", { className: "countdown-item" },
      React.createElement(SVGCircle, { radius: daysRadius }),
      days,
      React.createElement("span", null, "days")),


      hours &&
      React.createElement("div", { className: "countdown-item" },
      React.createElement(SVGCircle, { radius: hoursRadius }),
      hours,
      React.createElement("span", null, "hours")),


      minutes &&
      React.createElement("div", { className: "countdown-item" },
      React.createElement(SVGCircle, { radius: minutesRadius }),
      minutes,
      React.createElement("span", null, "minutes")),


      seconds &&
      React.createElement("div", { className: "countdown-item" },
      React.createElement(SVGCircle, { radius: secondsRadius }),
      seconds,
      React.createElement("span", null, "seconds"))),



      React.createElement("h3", null, "September 13, 2019")));



  }}


const SVGCircle = ({ radius }) =>
React.createElement("svg", { className: "countdown-svg" },
React.createElement("path", { fill: "none", stroke: "#ff0000", "stroke-width": "4", d: describeArc(50, 50, 48, 0, radius) }));



ReactDOM.render(
React.createElement(Countdown, { timeTillDate: "9 13 2019, 9:00 am", timeFormat: "MM DD YYYY, h:mm a" }),
document.getElementById('app'));


// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians) };

}

function describeArc(x, y, radius, startAngle, endAngle) {

  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
  "M", start.x, start.y,
  "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].
  join(" ");

  return d;
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}