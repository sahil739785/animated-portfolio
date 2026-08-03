import { create } from 'zustand'

const useStore = create((set) => ({
  // Loader state
  loaderComplete: false,
  setLoaderComplete: (val) => set({ loaderComplete: val }),

  // Menu state
  menuOpen: false,
  setMenuOpen: (val) => set({ menuOpen: val }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),

  // Cursor state
  cursorVariant: 'default', // 'default' | 'hovered' | 'link' | 'view'
  setCursorVariant: (variant) => set({ cursorVariant: variant }),

  // Hovered project (for floating image)
  hoveredProject: null,
  setHoveredProject: (project) => set({ hoveredProject: project }),
}))

export default useStore
