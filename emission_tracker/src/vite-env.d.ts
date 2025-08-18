/// <reference types="vite/client" />

type Environment = "development" | "production";
type BooleanString = "true" | "false";

// Core app vars
declare const VITE_REACT_APP_ENV: Environment;
declare const VITE_APP_VERSION: string;
declare const VITE_APP_BUILD: string;