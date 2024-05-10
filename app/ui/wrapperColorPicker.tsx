import { useRef, useState } from "react";
import { ColorPicker } from "./colorPicker";

type ColorsTypes = {
  floatCoverElements1: string;
  floatCoverElements2: string;
  floatCoverElements3: string;
  titleContentHeader: string;
  backgroundContentPages: string;
  backCoverBackground: string;
  floatingBackCoverElements1: string;
  floatingBackCoverElements2: string;
};

export function WrapperColorPicker() {
  const [colors, setColors] = useState<ColorsTypes>({
    floatCoverElements1: "#ffffff",
    floatCoverElements2: "#ffffff",
    floatCoverElements3: "#ffffff",
    titleContentHeader: "#ffffff",
    backgroundContentPages: "#ffffff",
    backCoverBackground: "#ffffff",
    floatingBackCoverElements1: "#ffffff",
    floatingBackCoverElements2: "#ffffff",
  });
  // float cover elements ref
  const floatCoverElements1Ref = useRef<HTMLInputElement>(null);
  const floatCoverElements2Ref = useRef<HTMLInputElement>(null);
  const floatCoverElements3Ref = useRef<HTMLInputElement>(null);
  // float cover elements handle colors
  const [showFloatCoverElements1, setShowFloatCoverElements1] = useState(false);
  const [showFloatCoverElements2, setShowFloatCoverElements2] = useState(false);
  const [showFloatCoverElements3, setShowFloatCoverElements3] = useState(false);
  // title content header ref
  const titleContentHeaderRef = useRef<HTMLInputElement>(null);
  // title content header handle colors
  const [showTitleContentHeader, setShowTitleContentHeader] = useState(false);
  // background content pages ref
  const backgroundContentPagesRef = useRef<HTMLInputElement>(null);
  // background content pages handle colors
  const [showBackgroundContentPages, setShowBackgroundContentPages] =
    useState(false);
  // back cover background ref
  const backCoverBackgroundRef = useRef<HTMLInputElement>(null);
  // back cover background handle colors
  const [showBackCoverBackground, setShowBackCoverBackground] = useState(false);
  // floating back cover elements1 ref
  const floatingBackCoverElements1Ref = useRef<HTMLInputElement>(null);
  // floating back cover elements1 handle colors
  const [showFloatingBackCoverElements1, setShowFloatingBackCoverElements1] =
    useState(false);
  // floating back cover elements2 ref
  const floatingBackCoverElements2Ref = useRef<HTMLInputElement>(null);
  // floating back cover elements2 handle colors
  const [showFloatingBackCoverElements2, setShowFloatingBackCoverElements2] =
    useState(false);

  const handleParentClick = (e: React.MouseEvent) => {
    // console.log(e.target);
    const targetColorPicker = (e.target as HTMLElement).closest(
      ".color-picker-hex"
    );

    // data float cover elements
    const dataOpenFloatCoverElements1 =
      floatCoverElements1Ref?.current?.getAttribute("data-open");
    const dataOpenFloatCoverElements2 =
      floatCoverElements2Ref?.current?.getAttribute("data-open");
    const dataOpenFloatCoverElements3 =
      floatCoverElements3Ref?.current?.getAttribute("data-open");

    // data content header
    const dataOpenTitleContentHeader =
      titleContentHeaderRef?.current?.getAttribute("data-open");

    // data background content pages
    const dataOpenBackgroundContentPages =
      backgroundContentPagesRef?.current?.getAttribute("data-open");
    // data back cover background
    const dataOpenBackCoverBackground =
      backCoverBackgroundRef?.current?.getAttribute("data-open");
    // data floating back cover elements1
    const dataOpenFloatingBackCoverElements1 =
      floatingBackCoverElements1Ref?.current?.getAttribute("data-open");
    // data floating back cover elements2
    const dataOpenFloatingBackCoverElements2 =
      floatingBackCoverElements2Ref?.current?.getAttribute("data-open");

    // float cover elements1
    if (dataOpenFloatCoverElements1 === "true" && !targetColorPicker) {
      if (floatCoverElements1Ref.current) {
        floatCoverElements1Ref.current.style.display = "none";
      }
      setShowFloatCoverElements1(false);
    }
    // float cover elements2
    if (dataOpenFloatCoverElements2 === "true" && !targetColorPicker) {
      if (floatCoverElements2Ref.current) {
        floatCoverElements2Ref.current.style.display = "none";
      }
      setShowFloatCoverElements2(false);
    }
    // float cover elements3
    if (dataOpenFloatCoverElements3 === "true" && !targetColorPicker) {
      if (floatCoverElements3Ref.current) {
        floatCoverElements3Ref.current.style.display = "none";
      }
      setShowFloatCoverElements3(false);
    }

    // title content header
    if (dataOpenTitleContentHeader === "true" && !targetColorPicker) {
      if (titleContentHeaderRef.current) {
        titleContentHeaderRef.current.style.display = "none";
      }
      setShowTitleContentHeader(false);
    }
    // background content pages
    if (dataOpenBackgroundContentPages === "true" && !targetColorPicker) {
      if (backgroundContentPagesRef.current) {
        backgroundContentPagesRef.current.style.display = "none";
      }
      setShowBackgroundContentPages(false);
    }
    // back cover background
    if (dataOpenBackCoverBackground === "true" && !targetColorPicker) {
      if (backCoverBackgroundRef.current) {
        backCoverBackgroundRef.current.style.display = "none";
      }
      setShowBackCoverBackground(false);
    }
    // floating back cover elements1
    if (dataOpenFloatingBackCoverElements1 === "true" && !targetColorPicker) {
      if (floatingBackCoverElements1Ref.current) {
        floatingBackCoverElements1Ref.current.style.display = "none";
      }
      setShowFloatingBackCoverElements1(false);
    }
    // floating back cover elements2
    if (dataOpenFloatingBackCoverElements2 === "true" && !targetColorPicker) {
      if (floatingBackCoverElements2Ref.current) {
        floatingBackCoverElements2Ref.current.style.display = "none";
      }
      setShowFloatingBackCoverElements2(false);
    }
  };

  return (
    <div
      style={
        {
          // border: "2px solid red",
        }
      }
      className="xl:flex justify-between"
      onClick={handleParentClick}
    >
      {/* float cover elements */}
      <div className="mb-4">
        <label
          // htmlFor="float_cover_elements1"
          className="mb-2 block text-sm font-medium"
        >
          Elementos flotantes de portada
        </label>
        <input
          name="float_cover_elements1"
          value={colors.floatCoverElements1}
          hidden
          readOnly
        />
        <ColorPicker
          setColor={(color) =>
            setColors({ ...colors, floatCoverElements1: color })
          }
          color={colors.floatCoverElements1}
          showPicker={showFloatCoverElements1}
          setShowPicker={setShowFloatCoverElements1}
          ref={floatCoverElements1Ref}
        />
        <input
          name="float_cover_elements2"
          value={colors.floatCoverElements2}
          hidden
          readOnly
        />
        <ColorPicker
          setColor={(color) =>
            setColors({ ...colors, floatCoverElements2: color })
          }
          color={colors.floatCoverElements2}
          showPicker={showFloatCoverElements2}
          setShowPicker={setShowFloatCoverElements2}
          ref={floatCoverElements2Ref}
        />
        <input
          name="float_cover_elements3"
          value={colors.floatCoverElements3}
          hidden
          readOnly
        />
        <ColorPicker
          setColor={(color) =>
            setColors({ ...colors, floatCoverElements3: color })
          }
          color={colors.floatCoverElements3}
          showPicker={showFloatCoverElements3}
          setShowPicker={setShowFloatCoverElements3}
          ref={floatCoverElements3Ref}
        />
      </div>

      {/* title content header*/}
      <div className="mb-4">
        <label
          htmlFor="title_content_header"
          className="mb-2 block text-sm font-medium"
        >
          Títulos encabezados de contenido
        </label>
        <input
          name="title_content_header"
          value={colors.titleContentHeader}
          hidden
          readOnly
        />
        <ColorPicker
          setColor={(color) =>
            setColors({ ...colors, titleContentHeader: color })
          }
          color={colors.titleContentHeader}
          showPicker={showTitleContentHeader}
          setShowPicker={setShowTitleContentHeader}
          ref={titleContentHeaderRef}
        />
      </div>

      {/* background content pages*/}
      <div className="mb-4">
        <label
          htmlFor="background_content_pages"
          className="mb-2 block text-sm font-medium"
        >
          Fondo de páginas de contenido
        </label>
        <input
          name="background_content_pages"
          value={colors.backgroundContentPages}
          hidden
          readOnly
        />
        <ColorPicker
          setColor={(color) =>
            setColors({ ...colors, backgroundContentPages: color })
          }
          color={colors.backgroundContentPages}
          showPicker={showBackgroundContentPages}
          setShowPicker={setShowBackgroundContentPages}
          ref={backgroundContentPagesRef}
        />
      </div>

      {/* back cover background*/}
      <div className="mb-4">
        <label
          htmlFor="back_cover_background"
          className="mb-2 block text-sm font-medium"
        >
          Fondo de contraportada
        </label>
        <input
          name="back_cover_background"
          value={colors.backCoverBackground}
          hidden
          readOnly
        />
        <ColorPicker
          setColor={(color) =>
            setColors({ ...colors, backCoverBackground: color })
          }
          color={colors.backCoverBackground}
          showPicker={showBackCoverBackground}
          setShowPicker={setShowBackCoverBackground}
          ref={backCoverBackgroundRef}
        />
      </div>
      {/* Floating back cover elements */}
      <div className="mb-4">
        <label
          // htmlFor="float_cover_elements1"
          className="mb-2 block text-sm font-medium"
        >
          Elementos flotantes de contraportada
        </label>
        <input
          name="floating_back_cover_elements1"
          value={colors.floatingBackCoverElements1}
          hidden
          readOnly
        />
        <ColorPicker
          setColor={(color) =>
            setColors({ ...colors, floatingBackCoverElements1: color })
          }
          color={colors.floatingBackCoverElements1}
          showPicker={showFloatingBackCoverElements1}
          setShowPicker={setShowFloatingBackCoverElements1}
          ref={floatingBackCoverElements1Ref}
        />
        <input
          name="floating_back_cover_elements2"
          value={colors.floatingBackCoverElements2}
          hidden
          readOnly
        />
        <ColorPicker
          setColor={(color) =>
            setColors({ ...colors, floatingBackCoverElements2: color })
          }
          color={colors.floatingBackCoverElements2}
          showPicker={showFloatingBackCoverElements2}
          setShowPicker={setShowFloatingBackCoverElements2}
          ref={floatingBackCoverElements2Ref}
        />
      </div>
    </div>
  );
}
