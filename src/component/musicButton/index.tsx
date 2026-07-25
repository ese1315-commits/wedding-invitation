import { useEffect, useRef } from "react"

const baseUrl = import.meta.env.BASE_URL

/**
 * 배경음악을 자동재생하는 컴포넌트입니다.
 * 화면에 보이는 버튼/아이콘 없이, 페이지 진입 시 자동재생을 시도합니다.
 * 브라우저 정책으로 자동재생이 막히면 사용자의 첫 터치/클릭 시점에 재생합니다.
 *
 * iOS Safari의 <audio> 태그는 기기의 무음 스위치에 의해 소리가 꺼지는
 * 문제가 있어, 대신 소리 없는 1x1 영상 + 오디오가 합쳐진 <video> 태그를
 * 사용합니다. (video 태그는 무음 스위치의 영향을 받지 않습니다.)
 *
 * public 폴더에 bgm.mp4 파일이 있어야 동작합니다.
 *
 * @returns {JSX.Element} 배경음악 재생용 video 요소
 */
export const MusicButton = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let unlocked = false

    const tryPlay = () => {
      video
        .play()
        .then(() => {
          unlocked = true
          removeListeners()
        })
        .catch(() => {
          /* 자동재생 차단됨, 아래 이벤트로 재시도 */
        })
    }

    const onFirstInteraction = () => {
      if (unlocked) return
      tryPlay()
    }

    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "touchstart",
      "touchend",
      "click",
      "keydown",
    ]

    const removeListeners = () => {
      events.forEach((event) =>
        document.removeEventListener(event, onFirstInteraction, {
          capture: true,
        }),
      )
    }

    tryPlay()

    events.forEach((event) =>
      document.addEventListener(event, onFirstInteraction, {
        capture: true,
      }),
    )

    return removeListeners
  }, [])

  return (
    <video
      ref={videoRef}
      src={`${baseUrl}/bgm.mp4`}
      loop
      playsInline
      muted={false}
      style={{
        position: "fixed",
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  )
}
