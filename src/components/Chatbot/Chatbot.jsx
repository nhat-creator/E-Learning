import { useEffect, useMemo, useRef, useState } from "react";

const buildRules = () => [
  {
    keywords: ["xin chào", "chào", "hello", "hi", "hey"],
    response:
      "Xin chào! Mình có thể hỗ trợ bạn về khóa học, ghi danh, tài khoản hoặc cách thức liên hệ.",
  },
  {
    keywords: ["khóa học", "course", "môn học"],
    response:
      "Bạn có thể xem danh sách khóa học ở mục Khóa học. Muốn lọc theo danh mục hay tìm khóa học cụ thể không?",
  },
  {
    keywords: ["ghi danh", "register", "enroll"],
    response:
      "Để ghi danh, bạn vào trang chi tiết khóa học và bấm Ghi danh. Nếu chưa có tài khoản thì hãy tạo tài khoản trước.",
  },
  {
    keywords: ["đăng nhập", "login", "tài khoản", "account"],
    response:
      "Bạn có thể nhấn vô nút đăng nhập ở phía trên bên phải màn hình. Nếu quên mật khẩu, hãy liên hệ bộ phận hỗ trợ.",
  },
  {
    keywords: ["liên hệ", "support", "hỗ trợ", "contact"],
    response:
      "Bạn có thể liên hệ bộ phận hỗ trợ qua số điện thoại 0379829733 hoặc gửi thông tin qua email support@elearning.com.",
  },
];

const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const getResponse = (text, rules) => {
  const message = normalizeText(text);
  const words = message.split(" ");
  for (const rule of rules) {
    if (
      rule.keywords.some((keyword) => {
        const normalizedKeyword = normalizeText(keyword);
        if (normalizedKeyword.length <= 2) {
          return words.includes(normalizedKeyword);
        }
        return message.includes(normalizedKeyword);
      })
    ) {
      return rule.response;
    }
  }
  return "Mình chưa hiểu rõ. Bạn có thể hỏi về khóa học, ghi danh, tài khoản hoặc hỗ trợ nhé.";
};

export default function Chatbot() {
  const rules = useMemo(buildRules, []);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Chào bạn! Mình là trợ lý E-LEARNING. Bạn cần hỗ trợ gì?",
    },
  ]);
  const bodyRef = useRef(null);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!isOpen) return;
      const target = event.target;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      handleClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsVisible(true);
    requestAnimationFrame(() => setIsOpen(true));
  };

  const handleClose = () => {
    setIsOpen(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 220);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const reply = getResponse(trimmed, rules);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed },
      { from: "bot", text: reply },
    ]);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      {isVisible && (
        <div
          ref={panelRef}
          className={`absolute bottom-14 md:bottom-16 right-0 w-72 md:w-80 max-w-[90vw] rounded-2xl border border-slate-100 bg-white/95 backdrop-blur shadow-[0_20px_60px_rgba(2,132,199,0.25)] transition-all duration-200 ease-out origin-bottom-right ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-br from-[#0EA5E9] to-[#0369A1] text-white rounded-t-2xl">
            <div>
              <p className="text-sm font-semibold">Trợ lý E-Learning</p>
              <p className="text-xs opacity-80">Hỗ trợ nhanh</p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/90 hover:text-white transition"
              aria-label="Đóng chatbox"
            >
              ✕
            </button>
          </div>
          <div
            ref={bodyRef}
            className="px-4 py-3 space-y-3 max-h-72 overflow-y-auto"
          >
            {messages.map((msg, index) => (
              <div
                key={`${msg.from}-${index}`}
                className={
                  msg.from === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    msg.from === "user"
                      ? "bg-[#0EA5E9] text-white px-3 py-2 rounded-2xl rounded-br-md text-sm max-w-[85%]"
                      : "bg-slate-100 text-slate-700 px-3 py-2 rounded-2xl rounded-bl-md text-sm max-w-[85%]"
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 px-3 py-3 bg-white rounded-b-2xl">
            <div className="flex items-center gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi..."
                className="flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-br from-[#0EA5E9] to-[#0369A1] hover:from-[#0284C7] hover:to-[#075985] text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="relative bg-white text-[#0EA5E9] w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl border border-slate-200 hover:shadow-[#0EA5E9]/30 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        aria-label="Mở chatbox"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-y-1 transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2c-5.523 0-10 3.806-10 8.5 0 2.706 1.52 5.117 3.9 6.667L4.5 21l4.27-2.32a12.4 12.4 0 0 0 3.23.42c5.523 0 10-3.806 10-8.5S17.523 2 12 2Zm-4 9.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm4-1.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm4 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="absolute inset-0 rounded-full bg-[#0EA5E9] opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></span>
      </button>
    </div>
  );
}
