<template>
  <span class="svg-box">
    <svg v-if="name == 'adsorb_off'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="编组-46" transform="translate(0.000000, 0.000000)">
          <rect id="蒙版备份-8" x="0" y="0" width="32" height="32" rx="1" />
          <g id="编组-41备份" transform="translate(4.000000, 4.000000)">
            <rect id="矩形" x="0" y="0" width="24" height="24" />
            <g id="编组" transform="translate(12.000000, 12.000000) scale(1, -1) translate(-12.000000, -12.000000) translate(3.150000, 2.233333)" fill="#84ABD4" fill-rule="nonzero">
              <path
                d="M12.8333333,0.6 C12.8333333,0.26862915 13.1019625,0 13.4333333,0 L17.1,0 C17.4313708,0 17.7,0.26862915 17.7,0.6 L17.7,10.6833333 C17.7,15.5710417 13.7377083,19.5333333 8.85,19.5333333 C3.96229165,19.5333333 0,15.5710417 0,10.6833333 L0,0.6 C0,0.26862915 0.26862915,0 0.6,0 L4.26666667,0 C4.59803752,0 4.86666667,0.26862915 4.86666667,0.6 L4.86666667,10.6833333 C4.86666667,12.8832458 6.65008752,14.6666667 8.85,14.6666667 C11.0499125,14.6666667 12.8333333,12.8832458 12.8333333,10.6833333 Z M16.5,3.95 L14.033,3.95 L14.0333333,10.6833333 C14.0333333,13.5459875 11.7126542,15.8666667 8.85,15.8666667 C5.98734582,15.8666667 3.66666667,13.5459875 3.66666667,10.6833333 L3.666,3.95 L1.199,3.95 L1.2,10.6833333 C1.2,14.9083 4.62503335,18.3333333 8.85,18.3333333 C13.0749667,18.3333333 16.5,14.9083 16.5,10.6833333 L16.5,3.95 Z M3.666,1.2 L1.2,1.2 L1.2,2.75 L3.666,2.75 L3.666,1.2 Z M16.4993333,1.2 L14.0333333,1.2 L14.0333333,2.75 L16.4993333,2.75 L16.4993333,1.2 Z"
                id="形状结合"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'adsorb_on'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="编组-46" transform="translate(0.000000, 0.000000)">
          <rect id="蒙版备份-8" x="0" y="0" width="32" height="32" rx="1" />
          <g id="编组-41备份" transform="translate(4.000000, 4.000000)">
            <rect id="矩形" x="0" y="0" width="24" height="24" />
            <g id="编组" transform="translate(12.000000, 12.000000) scale(1, -1) translate(-12.000000, -12.000000) translate(3.150000, 2.233333)" fill="#5AAAFF" fill-rule="nonzero">
              <path
                d="M12.8333333,0.6 C12.8333333,0.26862915 13.1019625,0 13.4333333,0 L17.1,0 C17.4313708,0 17.7,0.26862915 17.7,0.6 L17.7,10.6833333 C17.7,15.5710417 13.7377083,19.5333333 8.85,19.5333333 C3.96229165,19.5333333 0,15.5710417 0,10.6833333 L0,0.6 C0,0.26862915 0.26862915,0 0.6,0 L4.26666667,0 C4.59803752,0 4.86666667,0.26862915 4.86666667,0.6 L4.86666667,10.6833333 C4.86666667,12.8832458 6.65008752,14.6666667 8.85,14.6666667 C11.0499125,14.6666667 12.8333333,12.8832458 12.8333333,10.6833333 Z M16.5,3.95 L14.033,3.95 L14.0333333,10.6833333 C14.0333333,13.5459875 11.7126542,15.8666667 8.85,15.8666667 C5.98734582,15.8666667 3.66666667,13.5459875 3.66666667,10.6833333 L3.666,3.95 L1.199,3.95 L1.2,10.6833333 C1.2,14.9083 4.62503335,18.3333333 8.85,18.3333333 C13.0749667,18.3333333 16.5,14.9083 16.5,10.6833333 L16.5,3.95 Z M3.666,1.2 L1.2,1.2 L1.2,2.75 L3.666,2.75 L3.666,1.2 Z M16.4993333,1.2 L14.0333333,1.2 L14.0333333,2.75 L16.4993333,2.75 L16.4993333,1.2 Z"
                id="形状结合"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'close'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-385.000000, -810.000000)">
          <g id="编组-5备份-3" transform="translate(401.000000, 826.000000) scale(-1, 1) translate(-401.000000, -826.000000) translate(385.000000, 810.000000)">
            <rect id="蒙版备份-3" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组" transform="translate(4.000000, 4.000000)">
              <rect id="矩形" fill-rule="nonzero" x="0" y="0" width="24" height="24" />
              <line x1="4" y1="4" x2="20" y2="20" id="路径" stroke="#84ABD4" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="4" y1="20" x2="20" y2="4" id="路径" stroke="#84ABD4" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'down_align'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-633.000000, -810.000000)">
          <g id="编组-14备份-2" transform="translate(649.000000, 826.000000) scale(1, -1) translate(-649.000000, -826.000000) translate(633.000000, 810.000000)">
            <rect id="蒙版备份-7" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组备份-2" transform="translate(16.250000, 16.250000) scale(-1, 1) translate(-16.250000, -16.250000) translate(6.500000, 7.000000)" stroke-linejoin="round" stroke-width="1.2">
              <g id="编组-15">
                <polygon id="矩形" stroke="#5AAAFF" transform="translate(5.000000, 9.000000) rotate(-90.000000) translate(-5.000000, -9.000000) " points="-0.5 6.5 10.5 6.5 10.5 11.5 -0.5 11.5" />
                <rect id="矩形备份-4" stroke="#84ABD4" transform="translate(15.000000, 11.000000) rotate(-90.000000) translate(-15.000000, -11.000000) " x="7.5" y="8.5" width="15" height="5" />
                <line x1="19.5" y1="0.5" x2="0" y2="0.5" id="路径" stroke="#84ABD4" stroke-linecap="round" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'group'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-431.000000, -810.000000)">
          <g id="编组-5备份-2" transform="translate(447.000000, 826.000000) scale(-1, 1) translate(-447.000000, -826.000000) translate(431.000000, 810.000000)">
            <rect id="蒙版备份-3" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组" transform="translate(4.000000, 4.000000)">
              <rect id="矩形" fill-rule="nonzero" x="0" y="0" width="24" height="24" />
              <g id="编组-32备份" transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) translate(1.000000, 1.000000)">
                <rect id="矩形" x="0" y="0" width="22" height="22" />
                <g id="编组" transform="translate(1.944444, 2.591270)" stroke-linejoin="round" stroke-width="1.22">
                  <path
                    d="M0,0.934303345 C0,0.418301622 0.426769266,0 0.953216368,0 L6.67251458,0 L9.0555555,2.80291004 L17.1578946,2.80291004 C17.684356,2.80291004 18.111111,3.22119764 18.111111,3.73721338 L18.111111,15.8831569 C18.111111,16.3991726 17.684356,16.8174602 17.1578946,16.8174602 L0.953216368,16.8174602 C0.426769266,16.8174602 0,16.3991726 0,15.8831569 L0,0.934303345 Z"
                    id="路径"
                    stroke="#84ABD4"
                  />
                  <polyline id="路径" stroke="#5AAAFF" stroke-linecap="round" points="5.36239492 10.670851 8.00036676 12.8984717 12.7487161 6.77251482" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'horizontal_align'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-689.000000, -810.000000)">
          <g id="编组-14备份-3" transform="translate(705.000000, 826.000000) scale(1, -1) translate(-705.000000, -826.000000) translate(689.000000, 810.000000)">
            <rect id="蒙版备份-7" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组备份-2" transform="translate(16.000000, 16.000000) scale(-1, 1) translate(-16.000000, -16.000000) translate(4.500000, 8.500000)" stroke-linejoin="round" stroke-width="1.2">
              <g id="编组-15">
                <polygon id="矩形" stroke="#5AAAFF" transform="translate(6.676565, 7.500000) rotate(-90.000000) translate(-6.676565, -7.500000) " points="1.17656521 5 12.1765652 5 12.1765652 10 1.17656521 10" />
                <rect id="矩形备份-4" stroke="#84ABD4" transform="translate(16.176565, 7.500000) rotate(-90.000000) translate(-16.176565, -7.500000) " x="8.67656521" y="5" width="15" height="5" />
                <line x1="22.5" y1="7.5" x2="0.353130427" y2="7.5" id="路径" stroke="#84ABD4" stroke-linecap="round" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'horizontal_pos'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-875.000000, -810.000000)">
          <g id="编组-14备份-6" transform="translate(891.000000, 826.000000) scale(1, -1) translate(-891.000000, -826.000000) translate(875.000000, 810.000000)">
            <rect id="蒙版备份-7" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组" transform="translate(8.000000, 7.500000)" stroke-linejoin="round" stroke-width="1.2">
              <rect id="矩形" stroke="#5AAAFF" transform="translate(7.562500, 8.250000) rotate(90.000000) translate(-7.562500, -8.250000) " x="1.14583333" y="5.5" width="12.8333333" height="5.5" />
              <line x1="14.8958333" y1="0" x2="14.8958333" y2="16.5" id="路径" stroke="#84ABD4" stroke-linecap="round" />
              <line x1="0.229166667" y1="0" x2="0.229166667" y2="16.5" id="路径" stroke="#84ABD4" stroke-linecap="round" />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'horizontal_reverse'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 26 26" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="大屏编辑页" transform="translate(-1713.000000, -487.000000)">
          <g id="编组-14备份-7" transform="translate(1726.000000, 500.000000) scale(1, -1) translate(-1726.000000, -500.000000) translate(1706.000000, 484.000000)">
            <g id="编组" transform="translate(7.000000, 3.000000)">
              <rect id="矩形" fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="26" height="26" />
              <line x1="13" y1="3.25" x2="13" y2="22.75" id="路径" stroke="#9DC9F7" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2" />
              <polygon id="路径" stroke="#9DC9F7" stroke-width="1.2" stroke-linejoin="round" points="2.16666667 18.4166667 8.66666667 6.5 8.66666667 18.4166667" />
              <polygon id="路径" stroke="#9DC9F7" stroke-width="1.2" stroke-linejoin="round" points="23.8333333 18.4166667 17.3333333 18.4166667 17.3333333 6.5" />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'keyboard'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" viewBox="0 0 25 25" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-656.000000, -708.000000)">
          <g id="编组-5备份-4" transform="translate(648.500000, 707.975046)">
            <g id="编组-27" transform="translate(8.000000, 1.000000)">
              <rect id="矩形" x="0" y="0" width="24" height="24" />
              <g id="编组-24" transform="translate(2.833333, 5.524954)" stroke="#B2C7DB" stroke-linejoin="round" stroke-width="1.375">
                <g id="编组" transform="translate(0.000000, 0.000000)">
                  <path
                    d="M17.4166667,0 L0.916666667,0 C0.410405417,0 0,0.384068683 0,0.857841893 L0,12.8676284 C0,13.3414145 0.410405417,13.7254703 0.916666667,13.7254703 L17.4166667,13.7254703 C17.9229417,13.7254703 18.3333333,13.3414145 18.3333333,12.8676284 L18.3333333,0.857841893 C18.3333333,0.384068683 17.9229417,0 17.4166667,0 Z"
                    id="路径"
                  />
                  <line x1="2.75" y1="7.01348183" x2="3.66666667" y2="7.01348183" id="路径" stroke-linecap="round" />
                  <line x1="2.75" y1="10.0134818" x2="3.66666667" y2="10.0134818" id="路径备份-5" stroke-linecap="round" />
                  <line x1="14.9692989" y1="10.0134818" x2="15.8859656" y2="10.0134818" id="路径备份-6" stroke-linecap="round" />
                  <line x1="2.75" y1="4.01348183" x2="3.66666667" y2="4.01348183" id="路径备份-2" stroke-linecap="round" />
                  <line x1="6.01715798" y1="7.01348183" x2="6.93382465" y2="7.01348183" id="路径" stroke-linecap="round" />
                  <line x1="9.28431597" y1="7.01348183" x2="10.2009826" y2="7.01348183" id="路径备份-7" stroke-linecap="round" />
                  <line x1="12.551474" y1="7.01348183" x2="13.4681406" y2="7.01348183" id="路径备份-9" stroke-linecap="round" />
                  <line x1="15.4276323" y1="7.01348183" x2="16.3442989" y2="7.01348183" id="路径备份-11" stroke-linecap="round" />
                  <line x1="6.01715798" y1="4.01348183" x2="6.93382465" y2="4.01348183" id="路径备份-3" stroke-linecap="round" />
                  <line x1="9.28431597" y1="4.01348183" x2="10.2009826" y2="4.01348183" id="路径备份-8" stroke-linecap="round" />
                  <line x1="12.551474" y1="4.01348183" x2="13.4681406" y2="4.01348183" id="路径备份-10" stroke-linecap="round" />
                  <line x1="15.4276323" y1="4.01348183" x2="16.3442989" y2="4.01348183" id="路径备份-12" stroke-linecap="round" />
                  <line x1="5.58988274" y1="10.1384818" x2="12.7434506" y2="10.1384818" id="路径" stroke-linecap="round" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'layer_bottom'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="17px" viewBox="0 0 17 17" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-332.000000, -938.000000)">
          <g id="编组-14备份-5" transform="translate(340.911393, 946.788670) scale(1, -1) translate(-340.911393, -946.788670) translate(332.911393, 938.788670)">
            <rect id="矩形" x="0" y="0" width="16" height="16" />
            <g id="编组" transform="translate(1.500000, 1.469101)" stroke="#B2C7DB" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.16346154">
              <line x1="6.50321891" y1="0.0404095506" x2="6.50321891" y2="12.1236358" id="路径" />
              <polyline id="路径" points="1.84615385 4.82022472 6.5 0 11.1538462 4.82022472" />
              <line x1="0" y1="9.05617978" x2="13" y2="9.05617978" id="路径" />
              <line x1="0" y1="12.5617978" x2="13" y2="12.5617978" id="路径备份" />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'layer_down'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="17px" viewBox="0 0 17 17" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-408.000000, -938.000000)">
          <g id="编组备份-5" transform="translate(416.734180, 946.788670) scale(1, -1) translate(-416.734180, -946.788670) translate(408.734180, 938.788670)">
            <rect id="矩形" x="0" y="0" width="16" height="16" />
            <path
              d="M8.43888282,2.94542204 L13.4388828,7.87691538 C13.6846383,8.11930366 13.6873679,8.51502236 13.4449796,8.76077783 C13.2025913,9.00653329 12.8068726,9.00926293 12.5611172,8.76687464 L8.62799991,4.88673944 L8.62845833,14.8972606 C8.62845833,15.2424385 8.3486363,15.5222606 8.00345833,15.5222606 C7.65828036,15.5222606 7.37845833,15.2424385 7.37845833,14.8972606 L7.37799991,4.88073944 L3.43888282,8.76687464 C3.22043352,8.9823309 2.88349475,9.00411373 2.64107933,8.83369249 L2.55502037,8.76077783 C2.31263208,8.51502236 2.31536172,8.11930366 2.56111718,7.87691538 L7.56111718,2.94542204 C7.80447872,2.70539488 8.19552128,2.70539488 8.43888282,2.94542204 Z M13,0.477739445 C13.345178,0.477739445 13.625,0.757561476 13.625,1.10273944 C13.625,1.44791741 13.345178,1.72773944 13,1.72773944 L3,1.72773944 C2.65482203,1.72773944 2.375,1.44791741 2.375,1.10273944 C2.375,0.757561476 2.65482203,0.477739445 3,0.477739445 L13,0.477739445 Z"
              id="形状结合"
              fill="#B2C7DB"
              fill-rule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'layer_top'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="17px" viewBox="0 0 16 17" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-295.000000, -938.000000)">
          <g id="编组-39" transform="translate(295.000000, 938.788670)">
            <rect id="矩形" x="0" y="0" width="16" height="16" />
            <g id="编组" transform="translate(1.500000, 1.469101)" stroke="#B2C7DB" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.16346154">
              <line x1="6.50321891" y1="0.0404095506" x2="6.50321891" y2="12.1236358" id="路径" />
              <polyline id="路径" points="1.84615385 4.82022472 6.5 0 11.1538462 4.82022472" />
              <line x1="0" y1="9.05617978" x2="13" y2="9.05617978" id="路径" />
              <line x1="0" y1="12.5617978" x2="13" y2="12.5617978" id="路径备份" />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'layer_up'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="17px" viewBox="0 0 17 17" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-370.000000, -938.000000)">
          <g id="编组" transform="translate(370.822786, 938.788670)">
            <rect id="矩形" x="0" y="0" width="16" height="16" />
            <path
              d="M8.43888282,2.94542204 L13.4388828,7.87691538 C13.6846383,8.11930366 13.6873679,8.51502236 13.4449796,8.76077783 C13.2025913,9.00653329 12.8068726,9.00926293 12.5611172,8.76687464 L8.62799991,4.88673944 L8.62845833,14.8972606 C8.62845833,15.2424385 8.3486363,15.5222606 8.00345833,15.5222606 C7.65828036,15.5222606 7.37845833,15.2424385 7.37845833,14.8972606 L7.37799991,4.88073944 L3.43888282,8.76687464 C3.22043352,8.9823309 2.88349475,9.00411373 2.64107933,8.83369249 L2.55502037,8.76077783 C2.31263208,8.51502236 2.31536172,8.11930366 2.56111718,7.87691538 L7.56111718,2.94542204 C7.80447872,2.70539488 8.19552128,2.70539488 8.43888282,2.94542204 Z M13,0.477739445 C13.345178,0.477739445 13.625,0.757561476 13.625,1.10273944 C13.625,1.44791741 13.345178,1.72773944 13,1.72773944 L3,1.72773944 C2.65482203,1.72773944 2.375,1.44791741 2.375,1.10273944 C2.375,0.757561476 2.65482203,0.477739445 3,0.477739445 L13,0.477739445 Z"
              id="形状结合"
              fill="#B2C7DB"
              fill-rule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'left_align'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-483.000000, -810.000000)">
          <g id="编组-13" transform="translate(483.000000, 810.000000)">
            <rect id="蒙版备份-6" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组" transform="translate(3.000000, 3.000000)">
              <rect id="矩形" fill-rule="nonzero" x="0" y="0" width="26" height="26" />
              <rect id="矩形" stroke="#5AAAFF" stroke-width="1.2" stroke-linejoin="round" x="7.85416667" y="5.875" width="12" height="5" />
              <rect id="矩形备份-4" stroke="#84ABD4" stroke-width="1.2" stroke-linejoin="round" x="7.85416667" y="15.625" width="15.1666667" height="5" />
              <line x1="3.52083333" y1="3.25" x2="3.52083333" y2="22.75" id="路径" stroke="#84ABD4" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'redo'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-331.000000, -810.000000)">
          <g id="编组-5备份" transform="translate(347.000000, 826.000000) scale(-1, 1) translate(-347.000000, -826.000000) translate(331.000000, 810.000000)">
            <rect id="蒙版备份-3" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组" transform="translate(4.000000, 4.000000)">
              <rect id="矩形" fill-rule="nonzero" x="0" y="0" width="24" height="24" />
              <path
                d="M22,20.41805 C19.55345,17.4316 17.38085,15.73695 15.4822,15.3341 C13.58355,14.93125 11.77585,14.8704 10.0591,15.1515 L10.0591,20.5 L2,11.77265 L10.0591,3.5 L10.0591,8.5835 C13.23335,8.6086 15.9319,9.7474 18.15475,12 C20.37765,14.2526 21.65935,17.0586 22,20.41805 Z"
                id="路径"
                stroke="#84ABD4"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'revoke'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-285.000000, -810.000000)">
          <g id="编组-5" transform="translate(285.000000, 810.000000)">
            <rect id="蒙版备份-3" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组" transform="translate(4.000000, 4.000000)">
              <rect id="矩形" fill-rule="nonzero" x="0" y="0" width="24" height="24" />
              <path
                d="M22,20.41805 C19.55345,17.4316 17.38085,15.73695 15.4822,15.3341 C13.58355,14.93125 11.77585,14.8704 10.0591,15.1515 L10.0591,20.5 L2,11.77265 L10.0591,3.5 L10.0591,8.5835 C13.23335,8.6086 15.9319,9.7474 18.15475,12 C20.37765,14.2526 21.65935,17.0586 22,20.41805 Z"
                id="路径"
                stroke="#84ABD4"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'right_align'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-533.000000, -810.000000)">
          <g id="编组-14" transform="translate(533.000000, 810.000000)">
            <rect id="蒙版备份-7" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组备份-2" transform="translate(16.000000, 16.000000) scale(-1, 1) translate(-16.000000, -16.000000) translate(3.000000, 3.000000)">
              <rect id="矩形" fill-rule="nonzero" x="0" y="0" width="26" height="26" />
              <polygon id="矩形" stroke="#5AAAFF" stroke-width="1.2" stroke-linejoin="round" points="7.85416667 5.875 19.8541667 5.875 19.8541667 10.875 7.85416667 10.875" />
              <rect id="矩形备份-4" stroke="#84ABD4" stroke-width="1.2" stroke-linejoin="round" x="7.85416667" y="15.625" width="15.1666667" height="5" />
              <line x1="3.52083333" y1="3.25" x2="3.52083333" y2="22.75" id="路径" stroke="#84ABD4" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'ungroup'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-431.000000, -859.000000)">
          <g id="编组-5备份-2" transform="translate(447.000000, 875.000000) scale(-1, 1) translate(-447.000000, -875.000000) translate(431.000000, 859.000000)">
            <rect id="蒙版备份-3" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组" transform="translate(4.000000, 4.000000)">
              <rect id="矩形" fill-rule="nonzero" x="0" y="0" width="24" height="24" />
              <g id="编组-32备份" transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) translate(1.000000, 1.000000)">
                <rect id="矩形" x="0" y="0" width="22" height="22" />
                <g id="编组" transform="translate(1.944445, 2.591270)" stroke-linejoin="round" stroke-width="1.22">
                  <path
                    d="M0,0.934303345 C0,0.418301622 0.426769266,0 0.953216368,0 L6.67251458,0 L9.0555555,2.80291004 L17.1578946,2.80291004 C17.684356,2.80291004 18.111111,3.22119764 18.111111,3.73721338 L18.111111,15.8831569 C18.111111,16.3991726 17.684356,16.8174602 17.1578946,16.8174602 L0.953216368,16.8174602 C0.426769266,16.8174602 0,16.3991726 0,15.8831569 L0,0.934303345 Z"
                    id="路径"
                    stroke="#84ABD4"
                  />
                  <line x1="5.71958841" y1="13.1311705" x2="12.3915226" y2="6.73308446" id="路径" stroke="#5AAAFF" stroke-linecap="round" />
                  <line x1="5.71958841" y1="13.1311705" x2="12.3915226" y2="6.73308446" id="路径" stroke="#5AAAFF" stroke-linecap="round" transform="translate(9.055555, 9.932128) scale(-1, 1) translate(-9.055555, -9.932128) " />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'up_align'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-583.000000, -810.000000)">
          <g id="编组-14备份" transform="translate(583.000000, 810.000000)">
            <rect id="蒙版备份-7" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组备份-2" transform="translate(16.250000, 16.250000) scale(-1, 1) translate(-16.250000, -16.250000) translate(6.500000, 7.000000)" stroke-linejoin="round" stroke-width="1.2">
              <g id="编组-15">
                <polygon id="矩形" stroke="#5AAAFF" transform="translate(5.000000, 9.000000) rotate(-90.000000) translate(-5.000000, -9.000000) " points="-0.5 6.5 10.5 6.5 10.5 11.5 -0.5 11.5" />
                <rect id="矩形备份-4" stroke="#84ABD4" transform="translate(15.000000, 11.000000) rotate(-90.000000) translate(-15.000000, -11.000000) " x="7.5" y="8.5" width="15" height="5" />
                <line x1="19.5" y1="0.5" x2="0" y2="0.5" id="路径" stroke="#84ABD4" stroke-linecap="round" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'vertical_align'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-751.000000, -810.000000)">
          <g id="编组-14备份-4" transform="translate(767.000000, 826.000000) scale(1, -1) rotate(-270.000000) translate(-767.000000, -826.000000) translate(751.000000, 810.000000)">
            <rect id="蒙版备份-7" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组备份-2" transform="translate(16.000000, 16.000000) scale(-1, 1) translate(-16.000000, -16.000000) translate(4.500000, 8.500000)" stroke-linejoin="round" stroke-width="1.2">
              <g id="编组-15">
                <polygon id="矩形" stroke="#5AAAFF" transform="translate(6.676565, 7.500000) rotate(-90.000000) translate(-6.676565, -7.500000) " points="1.17656521 5 12.1765652 5 12.1765652 10 1.17656521 10" />
                <rect id="矩形备份-4" stroke="#84ABD4" transform="translate(16.176565, 7.500000) rotate(-90.000000) translate(-16.176565, -7.500000) " x="8.67656521" y="5" width="15" height="5" />
                <line x1="22.5" y1="7.5" x2="0.353130427" y2="7.5" id="路径" stroke="#84ABD4" stroke-linecap="round" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'vertical_pos'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="交互样式" transform="translate(-813.000000, -810.000000)">
          <g id="编组-14备份-5" transform="translate(829.000000, 826.000000) scale(1, -1) rotate(-270.000000) translate(-829.000000, -826.000000) translate(813.000000, 810.000000)">
            <rect id="蒙版备份-7" x="0" y="0" width="32" height="32" rx="1" />
            <g id="编组" transform="translate(8.000000, 8.000000)" stroke-linejoin="round" stroke-width="1.2">
              <rect id="矩形" stroke="#5AAAFF" transform="translate(7.562500, 8.250000) rotate(90.000000) translate(-7.562500, -8.250000) " x="1.14583333" y="5.5" width="12.8333333" height="5.5" />
              <line x1="14.8958333" y1="7.63819659e-14" x2="14.8958333" y2="16.5" id="路径" stroke="#84ABD4" stroke-linecap="round" />
              <line x1="0.229166667" y1="7.90761889e-14" x2="0.229166667" y2="16.5" id="路径" stroke="#84ABD4" stroke-linecap="round" />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'vertical_reverse'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 26 26" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="大屏编辑页" transform="translate(-1765.000000, -487.000000)">
          <g id="编组-14备份-8" transform="translate(1778.000000, 500.000000) scale(1, -1) translate(-1778.000000, -500.000000) translate(1758.000000, 484.000000)">
            <g id="编组" transform="translate(7.000000, 3.000000)">
              <rect id="矩形" fill-opacity="0.01" fill="#FFFFFF" fill-rule="nonzero" x="0" y="0" width="26" height="26" />
              <line x1="22.75" y1="13" x2="3.25" y2="13" id="路径" stroke="#9DC9F7" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2" />
              <polygon id="路径" stroke="#9DC9F7" stroke-width="1.2" stroke-linejoin="round" points="7.58333333 2.16666667 19.5 8.66666667 7.58333333 8.66666667" />
              <polygon id="路径" stroke="#9DC9F7" stroke-width="1.2" stroke-linejoin="round" points="7.58333333 23.8333333 7.58333333 17.3333333 19.5 17.3333333" />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'sub-screen'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="17px" viewBox="0 0 17 17" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="大屏编辑页" transform="translate(-722.000000, -1064.000000)">
          <g id="编组-29" transform="translate(710.000000, 1052.000000)">
            <g id="编组-45" transform="translate(12.500000, 12.500000)">
              <rect id="矩形" x="0" y="0" width="16" height="16" />
              <g id="编组" transform="translate(0.971154, 1.971154)" fill="#C3DEFB" fill-rule="nonzero">
                <path
                  d="M12.8788462,0 C13.5367514,0 14.0576923,0.551000935 14.0576923,1.21634615 L14.0576923,10.8413462 C14.0576923,11.5066993 13.5367534,12.0576923 12.8788462,12.0576923 L1.17884615,12.0576923 C0.520946553,12.0576923 0,11.5066968 0,10.8413462 L0,1.21634615 C0,0.55100335 0.520948622,0 1.17884615,0 Z M12.8788462,1.0576923 L1.17884615,1.0576923 C1.11877318,1.0576923 1.0576923,1.12229708 1.0576923,1.21634615 L1.0576923,10.8413462 C1.0576923,10.9354008 1.11876851,11 1.17884615,11 L12.8788462,11 C12.9389289,11 13,10.9354055 13,10.8413462 L13,1.21634615 C13,1.12229237 12.9389242,1.0576923 12.8788462,1.0576923 Z M7.02884615,3.09375 C7.32091981,3.09375 7.5576923,3.33052249 7.5576923,3.62259615 L7.5576923,8.43509615 C7.5576923,8.72716981 7.32091981,8.9639423 7.02884615,8.9639423 C6.73677249,8.9639423 6.5,8.72716981 6.5,8.43509615 L6.5,3.62259615 C6.5,3.33052249 6.73677249,3.09375 7.02884615,3.09375 Z M9.7788462,5.5 C10.0709199,5.5 10.3076924,5.73677249 10.3076924,6.02884615 L10.3076924,8.43509615 C10.3076924,8.72716981 10.0709199,8.9639423 9.7788462,8.9639423 C9.48677254,8.9639423 9.25000005,8.72716981 9.25000005,8.43509615 L9.25000005,6.02884615 C9.25000005,5.73677249 9.48677254,5.5 9.7788462,5.5 Z M4.2788461,4.8125 C4.57091976,4.8125 4.80769225,5.04927249 4.80769225,5.34134615 L4.80769225,8.43509615 C4.80769225,8.72716981 4.57091976,8.9639423 4.2788461,8.9639423 C3.98677243,8.9639423 3.74999995,8.72716981 3.74999995,8.43509615 L3.74999995,5.34134615 C3.74999995,5.04927249 3.98677243,4.8125 4.2788461,4.8125 Z"
                  id="形状结合"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'sub-screen_active'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="17px" viewBox="0 0 17 17" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="大屏编辑页" transform="translate(-722.000000, -1064.000000)">
          <g id="编组-29" transform="translate(710.000000, 1052.000000)">
            <g id="编组-45" transform="translate(12.500000, 12.500000)">
              <rect id="矩形" x="0" y="0" width="16" height="16" />
              <g id="编组" transform="translate(0.971154, 1.971154)" fill="#1398FF" fill-rule="nonzero">
                <path
                  d="M12.8788462,0 C13.5367514,0 14.0576923,0.551000935 14.0576923,1.21634615 L14.0576923,10.8413462 C14.0576923,11.5066993 13.5367534,12.0576923 12.8788462,12.0576923 L1.17884615,12.0576923 C0.520946553,12.0576923 0,11.5066968 0,10.8413462 L0,1.21634615 C0,0.55100335 0.520948622,0 1.17884615,0 Z M12.8788462,1.0576923 L1.17884615,1.0576923 C1.11877318,1.0576923 1.0576923,1.12229708 1.0576923,1.21634615 L1.0576923,10.8413462 C1.0576923,10.9354008 1.11876851,11 1.17884615,11 L12.8788462,11 C12.9389289,11 13,10.9354055 13,10.8413462 L13,1.21634615 C13,1.12229237 12.9389242,1.0576923 12.8788462,1.0576923 Z M7.02884615,3.09375 C7.32091981,3.09375 7.5576923,3.33052249 7.5576923,3.62259615 L7.5576923,8.43509615 C7.5576923,8.72716981 7.32091981,8.9639423 7.02884615,8.9639423 C6.73677249,8.9639423 6.5,8.72716981 6.5,8.43509615 L6.5,3.62259615 C6.5,3.33052249 6.73677249,3.09375 7.02884615,3.09375 Z M9.7788462,5.5 C10.0709199,5.5 10.3076924,5.73677249 10.3076924,6.02884615 L10.3076924,8.43509615 C10.3076924,8.72716981 10.0709199,8.9639423 9.7788462,8.9639423 C9.48677254,8.9639423 9.25000005,8.72716981 9.25000005,8.43509615 L9.25000005,6.02884615 C9.25000005,5.73677249 9.48677254,5.5 9.7788462,5.5 Z M4.2788461,4.8125 C4.57091976,4.8125 4.80769225,5.04927249 4.80769225,5.34134615 L4.80769225,8.43509615 C4.80769225,8.72716981 4.57091976,8.9639423 4.2788461,8.9639423 C3.98677243,8.9639423 3.74999995,8.72716981 3.74999995,8.43509615 L3.74999995,5.34134615 C3.74999995,5.04927249 3.98677243,4.8125 4.2788461,4.8125 Z"
                  id="形状结合"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg v-if="name == 'back-screen'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="17px" viewBox="0 0 17 17" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="大屏编辑页" transform="translate(-870.000000, -1064.000000)">
          <g id="编组-30" transform="translate(862.215112, 1051.082060)">
            <g id="编组-46" transform="translate(8.352791, 13.417940)">
              <rect id="矩形备份-49" x="0" y="0" width="16" height="16" />
              <g id="编组备份-4" transform="translate(0.903250, 1.971139)" fill="#917158" fill-rule="nonzero">
                <path
                  d="M12.8788462,1.50233803e-05 C13.5367514,1.50233803e-05 14.0576923,0.551015958 14.0576923,1.21636117 L14.0590193,5.75506344 C14.1626133,5.92580017 14.1593391,6.1387123 14.0578341,6.3047529 L14.0576923,10.8413612 C14.0576923,11.5067143 13.5367534,12.0577073 12.8788462,12.0577073 L1.17884615,12.0577073 C0.520946553,12.0577073 0,11.5067119 0,10.8413612 L0,1.21636117 C0,0.551018374 0.520948622,1.50233803e-05 1.17884615,1.50233803e-05 Z M13,7.212 L8.399,11 L12.8788462,11.000015 C12.9269123,11.000015 12.9756111,10.9586746 12.9931679,10.89398 L13,10.8413612 L13,7.212 Z M13,1.783 L1.911,11 L6.734,11 L13,5.842 L13,1.783 Z M12.219,1.057 L7.737,1.057 L1.2022397,6.43716703 C1.15772902,6.47380654 1.10901906,6.50195446 1.05807423,6.52180132 L1.057,10.335 L12.219,1.057 Z M6.073,1.057 L1.17884615,1.05770732 C1.11877318,1.05770732 1.0576923,1.1223121 1.0576923,1.21636117 L1.057,5.186 L6.073,1.057 Z"
                  id="形状结合"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </span>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'SvgBox'
})
defineProps({
  name: {
    type: String
  }
})
</script>

<style rel="stylesheet/scss" lang="scss">
.svg-box {
  display: inline-flex;
}
</style>
