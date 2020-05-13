export default function (jst) {
function NotImplementedError (message) {
    this.name = "NotImplementedError";
    this.message = (message || "");
}
NotImplementedError.prototype = Error.prototype;

function FormatError (message) {
    this.name = "FormatError";
    this.message = (message || "");
}
FormatError.prototype = Error.prototype;
}; // End of jst.errors.js
