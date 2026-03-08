/**
 * EduNigeria SMS — Chart Configurations
 * Chart.js v4 definitions for all dashboard charts
 */

const CHART_DEFAULTS = {
  font: { family: "'DM Sans', sans-serif" },
  color: '#78909C',
  gridColor: '#F0F4FF',
};

/* ===== ENROLLMENT TREND ===== */
function chartEnrollment(id) {
  const ctx = document.getElementById(id); if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [{
        label: 'Students',
        data:  [820,844,860,875,1022,1086,1124,1180,1248,1312],
        borderColor: '#1565C0', borderWidth: 2.5,
        backgroundColor: 'rgba(21,101,192,0.08)',
        pointBackgroundColor: '#1565C0', pointRadius: 4, pointHoverRadius: 6,
        fill: true, tension: 0.42,
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:{ mode:'index', intersect:false,
        callbacks:{ label: c => ` ${c.raw.toLocaleString()} students` }
      }},
      scales:{
        x:{ grid:{display:false}, ticks:{ font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color }},
        y:{ grid:{color:CHART_DEFAULTS.gridColor}, ticks:{ font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color }}
      }
    }
  });
}

/* ===== FEE COLLECTION BY CLASS ===== */
function chartFeeByClass(id) {
  const ctx = document.getElementById(id); if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['JSS 1','JSS 2','JSS 3','SS 1','SS 2','SS 3'],
      datasets: [
        { label:'Expected', data:[4500000,4200000,3900000,5100000,4800000,4500000],
          backgroundColor:'rgba(21,101,192,0.15)', borderColor:'#1565C0',
          borderWidth:1.5, borderRadius:6 },
        { label:'Collected', data:[3820000,3750000,3420000,4600000,4140000,3920000],
          backgroundColor:'rgba(46,125,50,0.75)', borderRadius:6 },
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'top', labels:{ font:{family:CHART_DEFAULTS.font.family,size:11}, usePointStyle:true }},
        tooltip:{ callbacks:{ label: c => `${c.dataset.label}: ₦${(c.raw/1e6).toFixed(2)}M` }}
      },
      scales:{
        x:{ grid:{display:false}, ticks:{ font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color }},
        y:{ grid:{color:CHART_DEFAULTS.gridColor}, ticks:{
          font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color,
          callback: v => '₦'+(v/1e6).toFixed(0)+'M'
        }}
      }
    }
  });
}

/* ===== ATTENDANCE DONUT ===== */
function chartAttendance(id) {
  const ctx = document.getElementById(id); if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Present','Absent','Late'],
      datasets:[{ data:[78,15,7],
        backgroundColor:['#2E7D32','#C62828','#E65100'],
        borderWidth:0, hoverOffset:8
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false, cutout:'72%',
      plugins:{ legend:{ position:'bottom', labels:{
        font:{family:CHART_DEFAULTS.font.family,size:11}, usePointStyle:true, padding:14
      }}}
    }
  });
}

/* ===== GRADE DISTRIBUTION ===== */
function chartGrades(id) {
  const ctx = document.getElementById(id); if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['A (70-100)','B (60-69)','C (50-59)','D (40-49)','F (<40)'],
      datasets:[{ label:'Students',
        data:[245,318,290,167,92],
        backgroundColor:['#2E7D32','#1565C0','#FF8F00','#E65100','#C62828'],
        borderRadius: 8
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      scales:{
        x:{ grid:{display:false}, ticks:{ font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color }},
        y:{ grid:{color:CHART_DEFAULTS.gridColor}, ticks:{ font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color }}
      }
    }
  });
}

/* ===== PERFORMANCE TREND ===== */
function chartPerformanceTrend(id) {
  const ctx = document.getElementById(id); if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1st Tm 23','2nd Tm 23','3rd Tm 23','1st Tm 24','2nd Tm 24','3rd Tm 24'],
      datasets: [
        { label:'School Avg', data:[58.4,61.2,63.8,65.1,67.4,69.2],
          borderColor:'#1565C0', backgroundColor:'rgba(21,101,192,0.06)',
          pointBackgroundColor:'#1565C0', tension:0.4, borderWidth:2.5, fill:true },
        { label:'National Avg', data:[55,55.5,56,57,57.5,58],
          borderColor:'#FF8F00', pointBackgroundColor:'#FF8F00',
          tension:0.4, borderWidth:2, borderDash:[6,4], fill:false },
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'top', labels:{ font:{family:CHART_DEFAULTS.font.family,size:11}, usePointStyle:true }}},
      scales:{
        x:{ grid:{display:false}, ticks:{ font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color }},
        y:{ min:40,max:80, grid:{color:CHART_DEFAULTS.gridColor}, ticks:{
          font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color,
          callback: v => v+'%'
        }}
      }
    }
  });
}

/* ===== SUBJECT RADAR ===== */
function chartSubjectRadar(id) {
  const ctx = document.getElementById(id); if (!ctx) return;
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels:['Math','English','Biology','Chemistry','Physics','Civic Ed','Economics'],
      datasets:[
        { label:'School Avg', data:[65,72,68,60,58,74,70],
          borderColor:'#1565C0', backgroundColor:'rgba(21,101,192,0.12)',
          borderWidth:2, pointBackgroundColor:'#1565C0' },
        { label:'Top Class',  data:[82,88,79,74,71,86,84],
          borderColor:'#2E7D32', backgroundColor:'rgba(46,125,50,0.08)',
          borderWidth:2, pointBackgroundColor:'#2E7D32' },
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'top', labels:{ font:{family:CHART_DEFAULTS.font.family,size:11}, usePointStyle:true }}},
      scales:{ r:{
        min:0, max:100, ticks:{ font:{size:10}, stepSize:20, color:CHART_DEFAULTS.color },
        pointLabels:{ font:{family:CHART_DEFAULTS.font.family,size:11} },
        grid:{ color:CHART_DEFAULTS.gridColor }
      }}
    }
  });
}

/* ===== MONTHLY FEES ===== */
function chartMonthlyFee(id) {
  const ctx = document.getElementById(id); if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [
        { label:'Collected (₦M)', data:[6.2,5.8,7.1,4.3,8.9,7.6,6.8,9.2,8.1,7.4],
          borderColor:'#2E7D32', backgroundColor:'rgba(46,125,50,0.08)',
          tension:0.4, borderWidth:2.5, fill:true, pointBackgroundColor:'#2E7D32', pointRadius:4 },
        { label:'Outstanding (₦M)', data:[3.1,2.9,3.6,5.2,4.4,3.8,3.4,2.6,3.1,4.0],
          borderColor:'#C62828', tension:0.4, borderWidth:2, fill:false,
          borderDash:[5,4], pointBackgroundColor:'#C62828', pointRadius:4 },
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'top', labels:{ font:{family:CHART_DEFAULTS.font.family,size:11}, usePointStyle:true }}},
      scales:{
        x:{ grid:{display:false}, ticks:{ font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color }},
        y:{ grid:{color:CHART_DEFAULTS.gridColor}, ticks:{
          font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color,
          callback: v => '₦'+v+'M'
        }}
      }
    }
  });
}

/* ===== TEACHER WORKLOAD ===== */
function chartTeacherWorkload(id) {
  const ctx = document.getElementById(id); if (!ctx) return;
  new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['Math Dept','English Dept','Sciences','Soc. Studies','Technical','Arts'],
      datasets:[{ data:[32,28,35,22,18,15],
        backgroundColor:[
          'rgba(21,101,192,0.7)','rgba(46,125,50,0.7)','rgba(106,27,154,0.7)',
          'rgba(255,143,0,0.7)','rgba(0,105,92,0.7)','rgba(198,40,40,0.7)'
        ],
        borderWidth:0
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'right', labels:{ font:{family:CHART_DEFAULTS.font.family,size:11}, usePointStyle:true, padding:10 }}}
    }
  });
}

/* ===== ATTENDANCE BY CLASS (horizontal bar) ===== */
function chartAttByClass(id) {
  const ctx = document.getElementById(id); if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['JSS 1A','JSS 1B','JSS 2A','JSS 2B','JSS 3A','JSS 3B','SS 1A','SS 1B','SS 2A','SS 2B','SS 3A','SS 3B'],
      datasets:[{ label:'Attendance %',
        data:[92,88,91,85,94,90,87,96,93,89,97,95],
        backgroundColor: function(ctx) {
          const v = ctx.dataset.data[ctx.dataIndex];
          return v >= 90 ? 'rgba(46,125,50,0.7)' : v >= 80 ? 'rgba(255,143,0,0.7)' : 'rgba(198,40,40,0.7)';
        },
        borderRadius:6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label: c => ` ${c.raw}%` }}},
      scales:{
        x:{ min:60, max:100, grid:{color:CHART_DEFAULTS.gridColor},
          ticks:{ font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color, callback:v=>v+'%' }},
        y:{ grid:{display:false}, ticks:{ font:{family:CHART_DEFAULTS.font.family,size:11}, color:CHART_DEFAULTS.color }}
      }
    }
  });
}
