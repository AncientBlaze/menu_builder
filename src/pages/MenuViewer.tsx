import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchMenu } from "@/utils/api";
import { MenuPreview } from "@/components/preview/MenuPreview";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { motion } from "motion/react";
import { Loader } from "@/components/Loader";

export default function MenuViewer() {
  const { id } = useParams({ strict: false });

  const {
    updateMenu,
    setRenderMode,
    editorTheme,
  } = useMenuEditor();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    setRenderMode("qr");

    return () => {
      setRenderMode("editor");
    };
  }, []);

  

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    fetchMenu(id)
      .then((menu) => {
        updateMenu(() => menu);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className={`
        min-h-screen flex items-center justify-center px-4
        transition-colors duration-300
        ${editorTheme === "dark"
          ? "bg-gradient-to-br from-slate-950 to-slate-900"
          : "bg-gradient-to-br from-slate-50 to-blue-50"
        }
      `}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <Loader />
          <p className={`
            text-sm mt-4 font-medium
            ${editorTheme === "dark"
              ? "text-slate-400"
              : "text-slate-600"
            }
          `}>
            Loading menu…
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`
        min-h-screen flex items-center justify-center px-6
        transition-colors duration-300
        ${editorTheme === "dark"
          ? "bg-gradient-to-br from-slate-950 to-slate-900"
          : "bg-gradient-to-br from-slate-50 to-blue-50"
        }
      `}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`
            text-center p-8 rounded-2xl
            ${editorTheme === "dark"
              ? "bg-slate-800/50 border border-slate-700/50 shadow-lg"
              : "bg-white/70 border border-slate-200 shadow-md backdrop-blur"
            }
          `}
        >
          <div className={`
            text-4xl mb-4
            ${editorTheme === "dark" ? "text-slate-600" : "text-slate-400"}
          `}>
            🔍
          </div>
          <h2 className={`
            text-xl font-semibold mb-2
            ${editorTheme === "dark"
              ? "text-slate-100"
              : "text-slate-900"
            }
          `}>
            Menu not found
          </h2>
          <p className={`
            text-sm leading-relaxed
            ${editorTheme === "dark"
              ? "text-slate-400"
              : "text-slate-600"
            }
          `}>
            This menu may have expired or is unavailable.
            <br />
            Please check the URL and try again.
          </p>
        </motion.div>
      </div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        min-h-screen transition-colors duration-300
        ${editorTheme === "dark"
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-white to-blue-50"
        }
        flex justify-center
      `}
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl px-4 py-6"
      >
        <MenuPreview />
      </motion.div>
    </motion.div>
  );
}
