import { useEffect, useRef } from "react"

const baseUrl = import.meta.env.BASE_URL

/**
 * 배경음악을 자동재생하는 컴포넌트입니다.
 * 화면에 보이는 버튼/아이콘 없이, 페이지 진입 시 자동재생을 시도합니다.
 * 브라우저 정책으로 자동재생이 막히면 사용자의 첫 터치/클릭 시점에 재생합니다.
 *
 * public 폴더에 bgm.mp3 파일이 있어야 동작합니다.
 *
 * @returns {JSX.Element} 배경음악 오디오 요소
 */
export const MusicButton = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tryPlay = () => {
      audio.play().catch(() => {
        /* 자동재생 차단됨, 아래 이벤트로 재시도 */
      })
    }

    tryPlay()

    const onFirstInteraction = () => {
      tryPlay()
      document.removeEventListener("click", onFirstInteraction)
      document.removeEventListener("touchstart", onFirstInteraction)
    }
    document.addEventListener("click", onFirstInteraction)
    document.addEventListener("touchstart", onFirstInteraction)

    return () => {
      document.removeEventListener("click", onFirstInteraction)
      document.removeEventListener("touchstart", onFirstInteraction)
    }
  }, [])

  return <audio ref={audioRef} src={`${baseUrl}bgm.mp3`} loop />
}
