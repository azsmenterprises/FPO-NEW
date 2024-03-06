var app = angular.module('myapp');
app.service('excelService', ['$http', function ($http) {
  // this.exportToExcel = function(data, fileName) {
  //   var blob = new Blob([data], {type: "application/vnd.ms-excel"});
  //   var url = window.URL.createObjectURL(blob);
  //   var a = document.createElement('a');
  //   a.href = url;
  //   a.download = fileName;
  //   a.click();
  // };
  // this.writeExcel = function (data, filename) {
  //   console.log(data,"data");
  //   var worksheet = XLSX.utils.json_to_sheet(data);
  //   var workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  //   XLSX.writeFile(workbook, filename);
  // };
  this.exportToExcel = function(data, filename) {
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    var binaryString = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([s2ab(binaryString)], { type: 'application/octet-stream' }), filename + '.xlsx');
  };
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }
}]);