export default function correctFormat(props) {
  let minut   = (props.minut < 10) ? '0' + props.minut : props.minut; 
  let second  = (props.second < 10) ? '0' + props.second : props.second;

  return minut + ':' + second;
}