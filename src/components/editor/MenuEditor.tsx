import { MenuMetaForm } from "./MenuMetaForm";
import { ThemeControls } from "./ThemeControls";
import { SectionsEditor } from "./SectionsEditor";
import { TemplateControls } from "./TemplateControls";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight, FaSquare, FaCircle, FaImage } from "react-icons/fa6";
import { motion } from "motion/react";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { CanvasInspector } from "../CanvasInspector";
import { LayersPanel } from "./LayersPanel";


/* =====================
  Menu Editor
===================== */

export function MenuEditor() {
  const [isOpen, setIsOpen] = useState(true);
  const { mode, setMode, editorTheme, addCanvasNode } = useMenuEditor();

  /* =====================
    Canvas Actions
  ===================== */

  const addRectangle = () =>
    addCanvasNode({
      type: "shape",
      width: 320,
      height: 180,
      z: 0,
      props: {
        kind: "rect",
        fill: "#000",
        opacity: 0.06,
        radius: 16,
      },
    });

  const addCircle = () =>
    addCanvasNode({
      type: "shape",
      width: 220,
      height: 220,
      z: 0,
      props: {
        kind: "circle",
        fill: "#000",
        opacity: 0.06,
      },
    });

  const addDecorativeSvg = () =>
    addCanvasNode({
      type: "shape",
      width: 300,
      height: 300,
      z: 0,
      props: {
        kind: "svg",
        svgPath:
          "M50 5 C20 20, 0 50, 50 95 C100 50, 80 20, 50 5 Z",
        fill: "#000",
        opacity: 0.05,
      },
    });

  const onImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    addCanvasNode({
      type: "image",
      width: 260,
      height: 260,
      z: 5,
      props: {
        src: url,
        fit: "contain",
      },
    });
  };

  return (
    <div className="relative flex h-full">
      {/* Editor Panel */}
      <aside
        className={`
            h-full
            transition-all duration-300 ease-in-out
            overflow-y-auto
            border-r
            ${editorTheme === "dark"
            ? "bg-slate-900/50 border-slate-700/50"
            : "bg-slate-50 border-slate-200"
          }
            ${isOpen ? "w-[440px] px-5 py-6" : "w-0 px-0 py-0"}
          `}
      >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Mode Toggle */}
            <div className="flex justify-center">
              <motion.div
                layout
                className={`
                    flex rounded-lg p-1.5 gap-1
                    ${editorTheme === "dark"
                    ? "bg-slate-800/50 border border-slate-700/50"
                    : "bg-slate-200 border border-slate-300"
                  }
                  `}
              >
                {(["menu", "template"] as const).map((m) => {
                  const active = mode === m;

                  return (
                    <motion.button
                      key={m}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMode(m)}
                      className={`
                          px-4 py-2 text-sm rounded-md font-medium transition
                          ${active
                          ? editorTheme === "dark"
                            ? "bg-blue-600/80 text-white"
                            : "bg-white text-blue-600"
                          : editorTheme === "dark"
                            ? "text-slate-300 hover:text-white"
                            : "text-slate-600 hover:text-slate-900"
                        }
                        `}
                    >
                      {m === "menu" ? "Menu" : "Template"}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* MENU MODE */}
            {mode === "menu" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Meta */}
                <div className={panel(editorTheme)}>
                  <MenuMetaForm />
                </div>

                {/* Theme */}
                <div className={panel(editorTheme)}>
                  <ThemeControls />
                </div>

                {/* Sections */}
                <div className={panel(editorTheme)}>
                  <SectionsEditor />
                </div>

                {/* =====================
                      Canvas Controls (NEW)
                  ===================== */}
                <div className={panel(editorTheme)}>
                  <h3 className="text-sm font-semibold mb-3">
                    Canvas Elements
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={addRectangle}
                      className={canvasBtn(editorTheme)}
                    >
                      <FaSquare /> Rect
                    </button>

                    <button
                      onClick={addCircle}
                      className={canvasBtn(editorTheme)}
                    >
                      <FaCircle /> Circle
                    </button>

                    <button
                      onClick={addDecorativeSvg}
                      className={canvasBtn(editorTheme)}
                    >
                      SVG
                    </button>
                  </div>

                  <label className="mt-4 block">
                    <input
                      type="file"
                      accept="image/*,svg+xml"
                      hidden
                      onChange={(e) =>
                        e.target.files &&
                        onImageUpload(e.target.files[0])
                      }
                    />
                    <div className={canvasBtn(editorTheme)}>
                      <FaImage /> Upload Image
                    </div>
                  </label>
                </div>
                {/* LAYERS */}
                <div className={panel(editorTheme)}>
                  <LayersPanel />
                </div>

                {/* INSPECTOR */}
                <div className={panel(editorTheme)}>
                  <CanvasInspector />
                </div>

              </motion.div>

            )}

            {/* TEMPLATE MODE */}
            {mode === "template" && (
              <div className={panel(editorTheme)}>
                <TemplateControls />
              </div>
            )}
          </motion.div>
        )}
      </aside>

      {/* Collapse Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((v) => !v)}
        className={`
            absolute top-24 -right-5 z-20
            h-10 w-10 rounded-full
            flex items-center justify-center
            ${editorTheme === "dark"
            ? "bg-blue-600"
            : "bg-slate-700"
          }
            text-white shadow-lg
          `}
      >
        {isOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
      </motion.button>
    </div>
  );
}

/* =====================
  UI helpers
===================== */

const panel = (theme: string) =>
  `
      rounded-xl p-5
      ${theme === "dark"
    ? "bg-slate-800/30 border border-slate-700/50"
    : "bg-white border border-slate-200/50"}
    `;

const canvasBtn = (theme: string) =>
  `
      flex items-center justify-center gap-2
      text-sm font-medium
      px-3 py-2 rounded-md
      transition
      ${theme === "dark"
    ? "bg-slate-700/50 hover:bg-slate-700 text-slate-200"
    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
  }
    `;
