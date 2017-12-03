import moment from "moment"
export default function(value, parttern){
    return moment(value).format(parttern);
}