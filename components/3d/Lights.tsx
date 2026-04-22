/**
 * Reusable lighting presets for all R3F scenes.
 * Import the appropriate preset per scene.
 */

/** Standard ambient + key + rim lighting for most scenes */
export function StandardLights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 2]} intensity={0.4} castShadow />
      <pointLight position={[-3, 2, -2]} intensity={0.8} color="#00D97E" />
    </>
  )
}

/** Atmospheric lighting for the /sudo desk scene */
export function SudoLights() {
  return (
    <>
      {/* Base fill */}
      <ambientLight intensity={0.2} />
      {/* Key light — right-top */}
      <directionalLight position={[4, 5, 3]} intensity={0.4} castShadow />
      {/* CRT screen glow */}
      <pointLight position={[-1, 1.2, 0.5]} intensity={1.5} color="#00D97E" distance={6} />
      {/* Rim light — back-left accent */}
      <pointLight position={[-3, 3, -3]} intensity={0.8} color="#00D97E" />
    </>
  )
}
