import React from 'react'

interface CharacterAvatarProps {
  type: string
  name: string
  accentColor?: string
  className?: string
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  type,
  name,
  accentColor = '#0ea5e9',
  className = 'w-24 h-24',
}) => {
  // SVG illustrations designed specially for Antarctica penguin and animal theme
  return (
    <div
      className={`relative rounded-3xl p-2 flex items-center justify-center shadow-inner overflow-hidden select-none transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 30%, #ffffff, ${accentColor}15, ${accentColor}30)`,
        border: `2px solid ${accentColor}40`,
      }}
    >
      {/* Background glow circle */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 70%)`,
        }}
      />

      {/* SVG Character Art */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={name}
      >
        {type === 'penguin-boy' && (
          // Freddie: Penguin boy with captain pilot cap & goggles
          <g>
            {/* Body */}
            <ellipse cx="50" cy="58" rx="28" ry="32" fill="#1e293b" />
            <ellipse cx="50" cy="62" rx="18" ry="24" fill="#f8fafc" />
            {/* Flipper wings */}
            <ellipse cx="22" cy="58" rx="7" ry="18" transform="rotate(20 22 58)" fill="#0f172a" />
            <ellipse cx="78" cy="58" rx="7" ry="18" transform="rotate(-20 78 58)" fill="#0f172a" />
            {/* Feet */}
            <ellipse cx="40" cy="88" rx="8" ry="4" fill="#f97316" />
            <ellipse cx="60" cy="88" rx="8" ry="4" fill="#f97316" />
            {/* Eyes */}
            <circle cx="42" cy="46" r="4.5" fill="#0f172a" />
            <circle cx="58" cy="46" r="4.5" fill="#0f172a" />
            <circle cx="43.5" cy="44.5" r="1.5" fill="#ffffff" />
            <circle cx="59.5" cy="44.5" r="1.5" fill="#ffffff" />
            {/* Beak */}
            <polygon points="50,49 43,55 57,55" fill="#f59e0b" />
            {/* Pilot Cap (Blue with gold star) */}
            <path d="M26 34 C26 22, 74 22, 74 34 Z" fill="#2563eb" />
            <rect x="22" y="32" width="56" height="5" rx="2.5" fill="#1d4ed8" />
            <circle cx="50" cy="27" r="3.5" fill="#fbbf24" />
            {/* Goggles on cap */}
            <circle cx="40" cy="34" r="5" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="60" cy="34" r="5" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="45" y1="34" x2="55" y2="34" stroke="#1e293b" strokeWidth="2" />
          </g>
        )}

        {type === 'penguin-girl' && (
          // Lolla: Penguin girl with pigtails and warm coral scarf
          <g>
            {/* Body */}
            <ellipse cx="50" cy="58" rx="27" ry="31" fill="#1e293b" />
            <ellipse cx="50" cy="62" rx="17" ry="23" fill="#f8fafc" />
            {/* Flipper wings */}
            <ellipse cx="23" cy="58" rx="6.5" ry="17" transform="rotate(20 23 58)" fill="#0f172a" />
            <ellipse
              cx="77"
              cy="58"
              rx="6.5"
              ry="17"
              transform="rotate(-20 77 58)"
              fill="#0f172a"
            />
            {/* Feet */}
            <ellipse cx="41" cy="88" rx="7.5" ry="4" fill="#fb923c" />
            <ellipse cx="59" cy="88" rx="7.5" ry="4" fill="#fb923c" />
            {/* Big expressive eyes with lashes */}
            <circle cx="41" cy="46" r="5" fill="#0f172a" />
            <circle cx="59" cy="46" r="5" fill="#0f172a" />
            <circle cx="42.5" cy="44" r="1.8" fill="#ffffff" />
            <circle cx="60.5" cy="44" r="1.8" fill="#ffffff" />
            <path
              d="M36 41 L34 38 M41 40 L41 37"
              stroke="#0f172a"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M64 41 L66 38 M59 40 L59 37"
              stroke="#0f172a"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Beak with smile */}
            <polygon points="50,49 44,55 56,55" fill="#f59e0b" />
            {/* Blush cheeks */}
            <circle cx="34" cy="52" r="3" fill="#f43f5e" opacity="0.4" />
            <circle cx="66" cy="52" r="3" fill="#f43f5e" opacity="0.4" />
            {/* Orange/Coral Pigtails (Maria-chiquinhas) */}
            <circle cx="24" cy="34" r="7" fill="#f97316" />
            <circle cx="76" cy="34" r="7" fill="#f97316" />
            <circle cx="28" cy="38" r="3.5" fill="#fbbf24" />
            <circle cx="72" cy="38" r="3.5" fill="#fbbf24" />
            {/* Little Warm Scarf */}
            <path d="M35 59 Q50 64 65 59 Q50 68 35 59 Z" fill="#f97316" />
          </g>
        )}

        {type === 'penguin-baby-pink' && (
          // Lilly: Cute baby penguin with pink bow
          <g>
            <ellipse cx="50" cy="62" rx="24" ry="26" fill="#334155" />
            <ellipse cx="50" cy="65" rx="16" ry="19" fill="#f8fafc" />
            <ellipse cx="26" cy="62" rx="5" ry="14" transform="rotate(25 26 62)" fill="#1e293b" />
            <ellipse cx="74" cy="62" rx="5" ry="14" transform="rotate(-25 74 62)" fill="#1e293b" />
            <ellipse cx="42" cy="87" rx="6" ry="3.5" fill="#f97316" />
            <ellipse cx="58" cy="87" rx="6" ry="3.5" fill="#f97316" />
            {/* Big baby eyes */}
            <circle cx="42" cy="52" r="4.5" fill="#0f172a" />
            <circle cx="58" cy="52" r="4.5" fill="#0f172a" />
            <circle cx="43.5" cy="50.5" r="1.8" fill="#ffffff" />
            <circle cx="59.5" cy="50.5" r="1.8" fill="#ffffff" />
            <polygon points="50,55 45,60 55,60" fill="#f59e0b" />
            <circle cx="36" cy="58" r="3" fill="#ec4899" opacity="0.45" />
            <circle cx="64" cy="58" r="3" fill="#ec4899" opacity="0.45" />
            {/* Pink Bow on head */}
            <ellipse cx="44" cy="36" rx="5" ry="3.5" fill="#ec4899" />
            <ellipse cx="56" cy="36" rx="5" ry="3.5" fill="#ec4899" />
            <circle cx="50" cy="36" r="3" fill="#f43f5e" />
          </g>
        )}

        {type === 'penguin-baby-green' && (
          // Pimpi: Adventurous baby penguin holding her tiny doll (green theme)
          <g>
            <ellipse cx="50" cy="62" rx="24" ry="26" fill="#334155" />
            <ellipse cx="50" cy="65" rx="16" ry="19" fill="#f8fafc" />
            <ellipse cx="26" cy="62" rx="5" ry="14" transform="rotate(25 26 62)" fill="#1e293b" />
            <ellipse cx="74" cy="62" rx="5" ry="14" transform="rotate(-25 74 62)" fill="#1e293b" />
            <ellipse cx="42" cy="87" rx="6" ry="3.5" fill="#f97316" />
            <ellipse cx="58" cy="87" rx="6" ry="3.5" fill="#f97316" />
            {/* Winking adventurous eyes */}
            <circle cx="42" cy="52" r="4.5" fill="#0f172a" />
            <circle cx="43.5" cy="50.5" r="1.8" fill="#ffffff" />
            <path
              d="M54 52 Q58 48 62 52"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <polygon points="50,55 45,60 55,60" fill="#f59e0b" />
            <circle cx="36" cy="58" r="2.5" fill="#10b981" opacity="0.4" />
            <circle cx="64" cy="58" r="2.5" fill="#10b981" opacity="0.4" />
            {/* Green explorer band/leaf */}
            <path
              d="M35 38 C42 32, 58 32, 65 38"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="50" cy="34" r="3" fill="#34d399" />
          </g>
        )}

        {type === 'penguin-baby-blue' && (
          // Popó: Engineer baby penguin with open singing beak & gear/beanie
          <g>
            <ellipse cx="50" cy="62" rx="24" ry="26" fill="#334155" />
            <ellipse cx="50" cy="65" rx="16" ry="19" fill="#f8fafc" />
            <ellipse cx="26" cy="62" rx="5" ry="14" transform="rotate(25 26 62)" fill="#1e293b" />
            <ellipse cx="74" cy="62" rx="5" ry="14" transform="rotate(-25 74 62)" fill="#1e293b" />
            <ellipse cx="42" cy="87" rx="6" ry="3.5" fill="#f97316" />
            <ellipse cx="58" cy="87" rx="6" ry="3.5" fill="#f97316" />
            {/* Big wide open happy eyes */}
            <circle cx="42" cy="51" r="5" fill="#0f172a" />
            <circle cx="58" cy="51" r="5" fill="#0f172a" />
            <circle cx="43.5" cy="49" r="2" fill="#ffffff" />
            <circle cx="59.5" cy="49" r="2" fill="#ffffff" />
            {/* Open mouth / laughing beak */}
            <path d="M44 56 Q50 63 56 56 Z" fill="#f59e0b" />
            <ellipse cx="50" cy="58" rx="2.5" ry="1.5" fill="#b45309" />
            {/* Cyan Beanie */}
            <path d="M32 40 C32 28, 68 28, 68 40 Z" fill="#06b6d4" />
            <circle cx="50" cy="27" r="4" fill="#67e8f9" />
          </g>
        )}

        {type === 'grandma' && (
          // Vó Aurora, a Velha da Caneca: Mystical penguin grandma with glasses & steaming mug
          <g>
            <ellipse cx="50" cy="58" rx="28" ry="32" fill="#334155" />
            <ellipse cx="50" cy="62" rx="18" ry="24" fill="#f1f5f9" />
            {/* Purple cape / shawl */}
            <path d="M22 55 Q50 72 78 55 Q50 82 22 55 Z" fill="#8b5cf6" opacity="0.9" />
            {/* Round spectacles */}
            <circle
              cx="41"
              cy="44"
              r="6"
              stroke="#fbbf24"
              strokeWidth="1.8"
              fill="#e0e7ff"
              fillOpacity="0.4"
            />
            <circle
              cx="59"
              cy="44"
              r="6"
              stroke="#fbbf24"
              strokeWidth="1.8"
              fill="#e0e7ff"
              fillOpacity="0.4"
            />
            <line x1="47" y1="44" x2="53" y2="44" stroke="#fbbf24" strokeWidth="2" />
            {/* Eyes behind glasses */}
            <circle cx="41" cy="44" r="2.5" fill="#0f172a" />
            <circle cx="59" cy="44" r="2.5" fill="#0f172a" />
            {/* Beak */}
            <polygon points="50,48 45,53 55,53" fill="#f59e0b" />
            {/* Warm knit hat */}
            <path d="M28 34 C28 20, 72 20, 72 34 Z" fill="#7c3aed" />
            <circle cx="50" cy="19" r="4.5" fill="#a78bfa" />
            {/* The Famous Mug (Caneca) */}
            <rect x="62" y="65" width="13" height="15" rx="2.5" fill="#f59e0b" />
            <path d="M75 68 C79 68, 79 77, 75 77" stroke="#f59e0b" strokeWidth="2" fill="none" />
            {/* Steam from mug */}
            <path
              d="M66 61 Q68 57 66 54 M71 61 Q73 57 71 54"
              stroke="#e2e8f0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {type === 'pilot-dad' && (
          // Comandante Atlas: Handsome penguin pilot dad with aviator glasses & pilot wings
          <g>
            <ellipse cx="50" cy="58" rx="29" ry="33" fill="#0f172a" />
            <ellipse cx="50" cy="62" rx="19" ry="25" fill="#f8fafc" />
            {/* Pilot Tie */}
            <polygon points="48,60 52,60 54,75 50,78 46,75" fill="#0284c7" />
            {/* Big Aviator Cap */}
            <path d="M24 35 C24 18, 76 18, 76 35 Z" fill="#0369a1" />
            <rect x="20" y="33" width="60" height="5" rx="2" fill="#0284c7" />
            {/* Gold Wings badge */}
            <path d="M42 28 Q50 31 58 28 Q50 34 42 28 Z" fill="#fbbf24" />
            <circle cx="50" cy="30" r="2.5" fill="#f59e0b" />
            {/* Aviator Sunglasses */}
            <path
              d="M34 42 Q42 42 43 47 Q43 51 38 51 Q33 51 34 42 Z"
              fill="#1e293b"
              stroke="#fbbf24"
              strokeWidth="1.5"
            />
            <path
              d="M66 42 Q58 42 57 47 Q57 51 62 51 Q67 51 66 42 Z"
              fill="#1e293b"
              stroke="#fbbf24"
              strokeWidth="1.5"
            />
            <line x1="43" y1="44" x2="57" y2="44" stroke="#fbbf24" strokeWidth="2" />
            {/* Beak */}
            <polygon points="50,51 44,57 56,57" fill="#f59e0b" />
          </g>
        )}

        {type === 'mom' && (
          // Mamãe Amélia: Warm penguin navigator mom with sea flower & compass locket
          <g>
            <ellipse cx="50" cy="58" rx="28" ry="32" fill="#1e293b" />
            <ellipse cx="50" cy="62" rx="18" ry="24" fill="#f8fafc" />
            {/* Warm Rose Scarf */}
            <path d="M30 58 Q50 67 70 58 Q50 72 30 58 Z" fill="#f43f5e" />
            {/* Gentle Eyes */}
            <circle cx="41" cy="45" r="4.5" fill="#0f172a" />
            <circle cx="59" cy="45" r="4.5" fill="#0f172a" />
            <circle cx="42.5" cy="43.5" r="1.8" fill="#ffffff" />
            <circle cx="60.5" cy="43.5" r="1.8" fill="#ffffff" />
            {/* Beak with smile */}
            <polygon points="50,49 44,55 56,55" fill="#f59e0b" />
            {/* Blush */}
            <circle cx="34" cy="52" r="3" fill="#f43f5e" opacity="0.4" />
            <circle cx="66" cy="52" r="3" fill="#f43f5e" opacity="0.4" />
            {/* Ear warmer / headphone band with flower */}
            <path d="M26 44 C26 22, 74 22, 74 44" stroke="#fb7185" strokeWidth="3.5" fill="none" />
            <circle cx="26" cy="44" r="5" fill="#f43f5e" />
            <circle cx="74" cy="44" r="5" fill="#f43f5e" />
            <circle cx="74" cy="44" r="2" fill="#fde047" />
          </g>
        )}

        {type === 'albatross' && (
          // Hugo o Albatroz: Mighty majestic white bird with giant golden wings and friendly beak
          <g>
            {/* Giant Wings behind */}
            <path
              d="M12 50 Q30 35 48 52 Q28 62 12 50 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <path
              d="M88 50 Q70 35 52 52 Q72 62 88 50 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            {/* Head and neck */}
            <ellipse
              cx="50"
              cy="52"
              rx="20"
              ry="26"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            {/* Feathers cap */}
            <path d="M38 34 Q50 26 62 34 Q50 30 38 34 Z" fill="#94a3b8" />
            {/* Eyes */}
            <circle cx="44" cy="46" r="4" fill="#0f172a" />
            <circle cx="56" cy="46" r="4" fill="#0f172a" />
            <circle cx="45" cy="45" r="1.5" fill="#ffffff" />
            <circle cx="57" cy="45" r="1.5" fill="#ffffff" />
            {/* Large majestic hooked beak */}
            <path
              d="M46 51 L54 51 L50 66 Q47 66 46 62 Z"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="1"
            />
            {/* Flying wind swirls */}
            <path
              d="M24 72 Q30 68 36 72"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M64 72 Q70 68 76 72"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        )}

        {type === 'whale' && (
          // Bel, a Baleia-Jubarte: Giant friendly gentle humpback whale with water spout
          <g>
            {/* Water spout */}
            <path
              d="M50 24 C50 14, 40 10, 36 14 C44 14, 48 20, 50 24 Z"
              fill="#38bdf8"
              opacity="0.8"
            />
            <path
              d="M50 24 C50 14, 60 10, 64 14 C56 14, 52 20, 50 24 Z"
              fill="#38bdf8"
              opacity="0.8"
            />
            <circle cx="50" cy="12" r="2.5" fill="#7dd3fc" />
            {/* Whale body */}
            <path d="M18 58 Q22 36 52 36 Q82 36 84 58 Q82 78 50 78 Q22 78 18 58 Z" fill="#0284c7" />
            {/* White belly ridges */}
            <path d="M26 62 Q50 74 76 62 Q50 76 26 62 Z" fill="#e0f2fe" />
            {/* Tail fluke */}
            <path d="M12 48 Q20 54 18 58 Q12 62 10 68 Q14 58 12 48 Z" fill="#0369a1" />
            {/* Flipper */}
            <ellipse cx="48" cy="65" rx="10" ry="4" transform="rotate(-15 48 65)" fill="#0369a1" />
            {/* Friendly sleepy happy eye */}
            <path
              d="M64 50 Q68 47 72 50"
              stroke="#f8fafc"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="68" cy="56" r="3" fill="#f43f5e" opacity="0.4" />
            {/* Gentle smile */}
            <path d="M68 58 Q74 61 78 57" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  )
}
