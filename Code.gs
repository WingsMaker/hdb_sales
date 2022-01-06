var googlesheet = "https://docs.google.com/spreadsheets/d/___________";
var read_from_googlesheet = false

function doGet(e) {
  if (e.parameter.page) {
    pg = e.parameter['page'];
  } else {
    pg = 'Index'; 
  }
  webpage = HtmlService.createTemplateFromFile(pg).evaluate();
  return webpage;
}

function readfromsheet( googlesheet_url ) {
    // this googlesheet named 'hdb_sales' with data columns = ['category','label',2013,...,2020], no title row
    var ss = SpreadsheetApp.openByUrl( googlesheet_url );
    var sheet = ss.getSheetByName('hdb_sales');
    var i, j, lastrow;
    sheet.sort(1);
    var data = sheet.getSheetValues(1,1,1,1);
    dlist = [];
    if (data[0][0] == "") {      
      return []
    } 
    var lastrow = sheet.getLastRow();      
    dtable = sheet.getSheetValues(1, 1, lastrow, 10);
    var dd=[];
    for (i = 0; i < lastrow; i++) {
      dd = []
      for (j = 0; j < 10; j++) {
        dd.push( dtable[i][j] )
      }
      dlist.push(dd);
    }
    return dlist
}

function hdb_sales() {
  var dlist = []
  if (read_from_googlesheet == true ) {
    dlist = readfromsheet(googlesheet)
    return dlist
  }

  url = 'https://flo.uri.sh/visualisation/3957251/embed';
  try {
    var response = UrlFetchApp.fetch(url)
    var resp = response.getContentText().toString()
  }   
  catch ( e ) {
    return dlist
  }
  html_blocks = resp.split('<script')
  html_blocks = html_blocks.filter( function(x) { return x.indexOf('Flourish_data') >= 0 } )
  html_blocks = html_blocks[0].split('=').filter( function(x) { return (x.indexOf('captions') >= 0) & (x.indexOf('000') >= 0)} )
  html_blocks = html_blocks[0].split(';')
  txt = html_blocks[0]  
  response = JSON.parse( txt )
  cnt = response.data.length
  var dlist = []
  var dd = []
  for (i = 0; i < cnt ; i++) {
    dd = []
    dd.push( response.data[ i ].category )
    dd.push( response.data[ i ].label )
    response.data[ i ].values = response.data[ i ].values.map( function(x) { return x.toString().replace(',','')  } )
    for (j = 0; j < 8; j++) {
      dd.push( response.data[ i ].values[j] )
    }
    dlist.push(dd)
  }  
  return dlist
}
