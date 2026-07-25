import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

/**
 * 오시는 길 정보를 표시하는 컴포넌트입니다.
 * 지도와 대중교통, 자가용 이용 방법을 안내합니다.
 *
 * @returns {JSX.Element} 오시는 길 섹션
 */
export const Location = () => {
  return (
    <>
      {/* 지도 및 주소 섹션 */}
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>

      {/* 대중교통 및 자가용 안내 섹션 */}
      <LazyDiv className="card location">
        {/* 대중교통 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용시
            <br />
            지하철 1호선 <b>범일역 2번 출구</b> 나와서
            <br />
            → 조방로를 따라 직진, 도보 5분
            <br />→ <b>동일타워</b> 건물로 들어와 3층으로 올라와주세요.
            <br />
            (2호선 이용시 <b>문현역 3번 출구</b>에서 도보 약 6분)
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            &quot;범일동 국민은행&quot; 정류장 하차
            <br />→ 10, 23, 108, 138번
            <br />
            &quot;시민회관&quot; 정류장 하차
            <br />→ 57, 68, 80, 83-1, 99, 134, 168번
            <br />
            &quot;자성대&quot; 정류장 하차
            <br />→ 22, 26, 27, 40, 41, 42, 83, 101번
            <br />
            하차 후 동일타워까지 도보로 이동해주세요.
          </div>
        </div>

        {/* 자가용 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비, 티맵 등 내비게이션에
            <br />
            <b>부산디엘웨딩홀</b> 또는 <b>동일타워</b> 검색 후 이용해주세요.
            <br />
            건물 지하주차장을 이용하시면
            <br />
            엘리베이터로 예식장(3층)까지 바로 연결됩니다.
          </div>
          <div />
          <div className="content">
            <b>
              ※ 예식 하객 기준 2시간 무료 주차 제공됩니다.
              <br />
              문의: 051-638-6200
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
