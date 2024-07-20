export function Video({url, width, height}) {
    return (
      <video width={width} height={height} autoPlay  loop  muted playsInline preload="none">
        <source src={url} type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
    )
  }