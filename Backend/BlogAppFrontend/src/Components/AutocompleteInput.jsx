import React, { useRef, useState } from "react";
import { Spinner } from "flowbite-react";
import { useAutocomplete } from "../hooks/useAutocomplete";

/**
 * AutocompleteInput — wraps a text input with AI ghost-text suggestions.
 *
 * Props:
 *  - value          {string}   controlled input value
 *  - onChange       {fn}       called with new string value
 *  - placeholder    {string}
 *  - className      {string}
 *  - id             {string}
 *  - required       {bool}
 */
export default function AutocompleteInput({
  value = "",
  onChange,
  placeholder = "Title",
  className = "",
  id,
  required,
}) {
  const { suggestion, isLoading, fetchSuggestion, clearSuggestion } =
    useAutocomplete("title");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  /** Accept the current suggestion */
  const acceptSuggestion = () => {
    if (!suggestion) return;
    onChange(value + suggestion);
    clearSuggestion();
  };

  const handleKeyDown = (e) => {
    if (suggestion && e.key === "Tab") {
      e.preventDefault();
      acceptSuggestion();
      return;
    }
    if (suggestion && e.key === "Escape") {
      clearSuggestion();
      return;
    }
    // On Tab without suggestion → trigger fetch
    if (!suggestion && e.key === "Tab" && value.trim().length >= 5) {
      e.preventDefault();
      fetchSuggestion(value);
    }
  };

  return (
    <div className={`relative flex-1 ${className}`}>
      {/* Ghost text layer */}
      {suggestion && focused && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center px-3 overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <span className="invisible whitespace-pre text-sm">{value}</span>
          <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-pre">
            {suggestion}
          </span>
        </div>
      )}

      {/* Real input */}
      <input
        ref={inputRef}
        id={id}
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          clearSuggestion();
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="relative z-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500"
        style={{ background: "transparent" }}
        autoComplete="off"
      />

      {/* AI button */}
      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (suggestion) {
              acceptSuggestion();
            } else {
              fetchSuggestion(value);
            }
          }}
          disabled={isLoading || value.trim().length < 5}
          className="flex items-center gap-1 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 px-2 py-1 text-xs font-medium text-white shadow hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <Spinner size="xs" />
              <span>Thinking…</span>
            </>
          ) : suggestion ? (
            "✅ Accept"
          ) : (
            "✨ AI Suggest"
          )}
        </button>
        {suggestion && (
          <button
            type="button"
            onClick={clearSuggestion}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕ Dismiss
          </button>
        )}
        {suggestion && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Press <kbd className="rounded bg-gray-200 dark:bg-gray-700 px-1">Tab</kbd> to accept
          </span>
        )}
      </div>
    </div>
  );
}
