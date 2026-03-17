"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ProjectCard } from "@/app/components/ProjectCard";
import { MiniProjectCard } from "@/app/components/MiniProjectCard";
import data from "@/public/data/data.json";

export default function Home() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  return (
    <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-24 relative z-10 w-full overflow-hidden">

      {/* =========================================
          Hero Section - Asymmetrical Impeccable Layout
          ========================================= */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        id="home" 
        className="relative min-h-[85vh] flex items-center justify-center mt-12 md:mt-0"
      >
        <motion.div 
          variants={fadeUp}
          className="glass-panel rounded-3xl p-10 md:p-14 lg:p-16 border border-white/5 shadow-2xl relative overflow-hidden group max-w-4xl w-full text-center"
        >
          <div className="relative z-10 flex flex-col items-center">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-display tracking-widest text-sm uppercase">Portfolio 2026</span>
              <div className="h-[1px] w-8 bg-primary"></div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight tracking-tight">
              HELLO, I'M
              <br/>
              A <span className="text-primary drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">FRONTEND</span>
              <br />
              DEVELOPER <span className="text-gray-500 font-light">&amp;</span> <span className="text-gray-300 italic">GEOLOGIST</span>
            </h1>

            <motion.p variants={fadeUp} className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl font-light">
              Transitioning from Geology to Web Development. Evolving into a Fullstack Developer. I craft meticulously designed interfaces embedded with robust logic.
             </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
              <Link href="#projects" className="btn-clean w-full sm:w-1/2 flex items-center justify-center px-6 py-4 border border-primary text-background-dark bg-primary font-bold rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] font-display uppercase tracking-wider hover:bg-emerald-400">
                <span className="flex items-center gap-2">View Work <i className="bi bi-arrow-down"></i></span>
              </Link>
              <a href="https://github.com/Lepidocodie" target="_blank" rel="noopener noreferrer" className="btn-clean w-full sm:w-1/2 flex items-center justify-center px-6 py-4 border border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/30 rounded-lg font-display uppercase tracking-wider">
                <i className="bi bi-github mr-2"></i> GitHub
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* =========================================
          Skills Section
          ========================================= */}
      <section id="skills">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wider">Technical Skills</h2>
          <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.6)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Programming Languages */}
          <div className="glass-panel p-6 rounded-xl border border-secondary/30 hover:border-secondary/60 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] group">
            <h3 className="text-white font-display font-bold text-base text-center mb-6 border-b border-gray-700 pb-2 tracking-wider">PROGRAMMING LANGUAGES</h3>
            <div className="flex justify-center flex-wrap gap-4 mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" aria-label="JavaScript" role="img" viewBox="0 0 512 512" className="w-12 h-12 group-hover/skill:scale-110 transition-transform"><rect width="512" height="512" fill="#f7df1e"></rect><path d="m324,370c10,17 24,29 47,29 20,0 33,-10 33,-24 0,-16 -13,-22 -35,-32l-12,-5c-35,-15 -58,-33 -58,-72 0,-36 27,-64 70,-64 31,0 53,11 68,39l-37,24c-8,-15 -17,-21 -31,-21 -14,0 -23,9 -23,21 0,14 9,20 30,29l12,5c41,18 64,35 64,76 0,43 -34,67 -80,67 -45,0 -74,-21 -88,-49zm-170,4c8,13 14,25 31,25 16,0 26,-6 26,-30V203h48v164c0,50 -29,72 -72,72 -39,0 -61,-20 -72,-44z"></path></svg>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-12 h-12 group-hover/skill:scale-110 transition-transform"><path fill="#007acc" d="M2,63.91v62.5H127V1.41H2Zm100.73-5a15.56,15.56,0,0,1,7.82,4.5,20.58,20.58,0,0,1,3,4c0,.16-5.4,3.81-8.69,5.85-.12.08-.6-.44-1.13-1.23a7.09,7.09,0,0,0-5.87-3.53c-3.79-.26-6.23,1.73-6.21,5a4.58,4.58,0,0,0,.54,2.34c.83,1.73,2.38,2.76,7.24,4.86,8.95,3.85,12.78,6.39,15.16,10,2.66,4,3.25,10.46,1.45,15.24-2,5.2-6.9,8.73-13.83,9.9a38.32,38.32,0,0,1-9.52-.1A23,23,0,0,1,80,109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34,9.34,0,0,1,1.15-.73L82.5,101l3.59-2.08.75,1.11a16.78,16.78,0,0,0,4.74,4.54c4,2.1,9.46,1.81,12.16-.62a5.43,5.43,0,0,0,.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48,16.48,0,0,1-3.43-6.25,25,25,0,0,1-.22-8c1.33-6.23,6-10.58,12.82-11.87A31.66,31.66,0,0,1,102.73,58.93ZM73.39,64.15l0,5.12H57.16V115.5H45.65V69.26H29.38v-5a49.19,49.19,0,0,1,.14-5.16c.06-.08,10-.12,22-.1L73.33,59Z"></path></svg>
              </div>
              <div>
                <svg className="w-12 h-12 group-hover/skill:scale-110 transition-transform" width="256px" height="255px" viewBox="0 0 256 255" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                    <defs>
                        <linearGradient x1="12.9593594%" y1="12.0393928%" x2="79.6388325%" y2="78.2008538%" id="linearGradient-1"><stop stopColor="#387EB8" offset="0%"></stop><stop stopColor="#366994" offset="100%"></stop></linearGradient>
                        <linearGradient x1="19.127525%" y1="20.5791813%" x2="90.7415328%" y2="88.4290372%" id="linearGradient-2"><stop stopColor="#FFE052" offset="0%"></stop><stop stopColor="#FFC331" offset="100%"></stop></linearGradient>
                    </defs>
                    <g>
                        <path d="M126.915866,0.0722755491 C62.0835831,0.0722801733 66.1321288,28.1874648 66.1321288,28.1874648 L66.2044043,57.3145115 L128.072276,57.3145115 L128.072276,66.0598532 L41.6307171,66.0598532 C41.6307171,66.0598532 0.144551098,61.3549438 0.144551098,126.771315 C0.144546474,192.187673 36.3546019,189.867871 36.3546019,189.867871 L57.9649915,189.867871 L57.9649915,159.51214 C57.9649915,159.51214 56.8001363,123.302089 93.5968379,123.302089 L154.95878,123.302089 C154.95878,123.302089 189.434218,123.859386 189.434218,89.9830604 L189.434218,33.9695088 C189.434218,33.9695041 194.668541,0.0722755491 126.915866,0.0722755491 L126.915866,0.0722755491 L126.915866,0.0722755491 Z M92.8018069,19.6589497 C98.9572068,19.6589452 103.932242,24.6339846 103.932242,30.7893845 C103.932246,36.9447844 98.9572068,41.9198193 92.8018069,41.9198193 C86.646407,41.9198239 81.6713721,36.9447844 81.6713721,30.7893845 C81.6713674,24.6339846 86.646407,19.6589497 92.8018069,19.6589497 L92.8018069,19.6589497 L92.8018069,19.6589497 Z" fill="url(#linearGradient-1)"></path>
                        <path d="M128.757101,254.126271 C193.589403,254.126271 189.540839,226.011081 189.540839,226.011081 L189.468564,196.884035 L127.600692,196.884035 L127.600692,188.138693 L214.042251,188.138693 C214.042251,188.138693 255.528417,192.843589 255.528417,127.427208 C255.52844,62.0108566 219.318366,64.3306589 219.318366,64.3306589 L197.707976,64.3306589 L197.707976,94.6863832 C197.707976,94.6863832 198.87285,130.896434 162.07613,130.896434 L100.714182,130.896434 C100.714182,130.896434 66.238745,130.339138 66.238745,164.215486 L66.238745,220.229038 C66.238745,220.229038 61.0044225,254.126271 128.757101,254.126271 L128.75.126271 L128.757101,254.126271 Z M162.87116,234.539597 C156.715759,234.539597 151.740726,229.564564 151.740726,223.409162 C151.740726,217.253759 156.715759,212.278727 162.87116,212.278727 C169.026563,212.278727 174.001595,217.253759 174.001595,223.409162 C174.001618,229.564564 169.026563,234.539597 162.87116,234.539597 L162.87116,234.539597 L162.87116,234.539597 Z" fill="url(#linearGradient-2)"></path>
                    </g>
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-6 pt-4 border-t border-white/5">
              {["JavaScript", "TypeScript", "Python", "SQL"].map(s => <span key={s} className="px-2 py-1 bg-gray-800 rounded-md text-[11px] font-bold border border-gray-700 text-gray-300">{s}</span>)}
            </div>
          </div>

          {/* Markup Languages */}
          <div className="glass-panel p-6 rounded-xl border border-primary/30 hover:border-primary/60 transition-colors shadow-[0_0_10px_rgba(74,222,128,0.1)] hover:shadow-[0_0_15px_rgba(74,222,128,0.2)]">
            <h3 className="text-white font-display font-bold text-base text-center mb-6 border-b border-gray-700 pb-2 tracking-wider">MARKUP LANGUAGES</h3>
            <div className="flex justify-center flex-wrap gap-4 mb-4">
              <div>
                <svg className="w-12 h-12 group-hover/skill:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#E65100" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path><path fill="#FF6D00" d="M24 8L24 39.9 35.2 36.7 37.7 8z"></path><path fill="#FFF" d="M24,25v-4h8.6l-0.7,11.5L24,35.1v-4.2l4.1-1.4l0.3-4.5H24z M32.9,17l0.3-4H24v4H32.9z"></path><path fill="#EEE" d="M24,30.9v4.2l-7.9-2.6L15.7,27h4l0.2,2.5L24,30.9z M19.1,17H24v-4h-9.1l0.7,12H24v-4h-4.6L19.1,17z"></path>
                </svg>
              </div>
              <div>
                <svg className="w-12 h-12 group-hover/skill:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#0277BD" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path><path fill="#039BE5" d="M24 8L24 39.9 35.2 36.7 37.7 8z"></path><path fill="#FFF" d="M33.1 13L24 13 24 17 28.9 17 28.6 21 24 21 24 25 28.4 25 28.1 29.5 24 30.9 24 35.1 31.9 32.5 32.6 21 32.6 21z"></path><path fill="#EEE" d="M24,13v4h-8.9l-0.3-4H24z M19.4,21l0.2,4H24v-4H19.4z M19.8,27h-4l0.3,5.5l7.9,2.6v-4.2l-4.1-1.4L19.8,27z"></path>
                </svg>
              </div>
              <div>
                <svg className="w-12 h-12 group-hover/skill:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#00acc1" d="M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.6 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-6.4,0-10.4,3.199-12,9.598 c2.4-3.199,5.2-4.399,8.4-3.599c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,5.152,11.025,5.152 c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.599c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24 L12,24z"></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-6 pt-4 border-t border-white/5">
              {["HTML", "CSS", "Tailwind CSS", "Bootstrap"].map(s => <span key={s} className="px-2 py-1 bg-gray-800 rounded-md text-[11px] font-bold border border-gray-700 text-gray-300">{s}</span>)}
            </div>
          </div>

          {/* Tools */}
          <div className="glass-panel p-6 rounded-xl border border-secondary/30 hover:border-secondary/60 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] group">
            <h3 className="text-white font-display font-bold text-base text-center mb-6 border-b border-gray-700 pb-2 tracking-wider">TOOLS</h3>
            <div className="flex justify-center flex-wrap gap-4 mb-4">
              <div>
                <div className="text-[#F05032] w-12 h-12 flex items-center justify-center text-5xl group-hover/skill:scale-110 transition-transform"><i className="bi bi-git"></i></div>
              </div>
              <div>
                <div className="text-white w-12 h-12 flex items-center justify-center text-5xl group-hover/skill:scale-110 transition-transform"><i className="bi bi-github"></i></div>
              </div>
              <div>
                <svg className="w-12 h-12 group-hover/skill:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#29b6f6" d="M44,11.11v25.78c0,1.27-0.79,2.4-1.98,2.82l-8.82,4.14L34,33V15L33.2,4.15l8.82,4.14 C43.21,8.71,44,9.84,44,11.11z"></path><path fill="#0277bd" d="M9,33.896L34,15V5.353c0-1.198-1.482-1.758-2.275-0.86L4.658,29.239 c-0.9,0.83-0.849,2.267,0.107,3.032c0,0,1.324,1.232,1.803,1.574C7.304,34.37,8.271,34.43,9,33.896z"></path><path fill="#0288d1" d="M9,14.104L34,33v9.647c0,1.198-1.482,1.758-2.275,0.86L4.658,18.761 c-0.9-0.83-0.849-2.267,0.107-3.032c0,0,1.324-1.232,1.803-1.574C7.304,13.63,8.271,13.57,9,14.104z"></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-6 pt-4 border-t border-white/5">
              {["Git", "GitHub", "VS Code", "Figma", "Postman", "MySQL"].map(s => <span key={s} className="px-2 py-1 bg-gray-800 rounded-md text-[11px] font-bold border border-gray-700 text-gray-300">{s}</span>)}
            </div>
          </div>

          {/* Frameworks */}
          <div className="glass-panel p-6 rounded-xl border border-primary/30 hover:border-primary/60 transition-colors shadow-[0_0_10px_rgba(74,222,128,0.1)] hover:shadow-[0_0_15px_rgba(74,222,128,0.2)]">
            <h3 className="text-white font-display font-bold text-base text-center mb-6 border-b border-gray-700 pb-2 tracking-wider">FRAMEWORKS</h3>
            <div className="flex justify-center flex-wrap gap-4 mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" className="w-12 h-12 group-hover/skill:scale-110 transition-transform" style={{color: "rgb(255, 255, 255)"}}>
                  <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                  </g>
                </svg>
              </div>
              <div>
                <svg className="w-12 h-12 group-hover/skill:scale-110 transition-transform" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M399.641 59.525l-183.998 329.02c-3.799 6.793-13.559 6.833-17.415.073L10.582 59.556C6.381 52.19 12.68 43.267 21.028 44.759l184.195 32.923c1.175.21 2.378.208 3.553-.006l180.343-32.87c8.32-1.517 14.649 7.337 10.522 14.719z" fill="url(#prefix___Linear1)" fillRule="nonzero" transform="translate(-5.47 4.116) scale(1.2749)"/><path d="M292.965 1.574L156.801 28.255a5 5 0 00-4.03 4.611l-8.376 141.464c-.197 3.332 2.863 5.918 6.115 5.168l37.91-8.749c3.547-.818 6.752 2.306 6.023 5.873l-11.263 55.153c-.758 3.712 2.727 6.886 6.352 5.785l23.415-7.114c3.63-1.102 7.118 2.081 6.35 5.796l-17.899 86.633c-1.12 5.419 6.088 8.374 9.094 3.728l2.008-3.103 110.954-221.428c1.858-3.707-1.346-7.935-5.418-7.149l-39.022 7.531c-3.667.707-6.787-2.708-5.752-6.296l25.469-88.291c1.036-3.594-2.095-7.012-5.766-6.293z" fill="url(#prefix___Linear2)" fillRule="nonzero" transform="translate(-5.47 4.116) scale(1.2749)"/><defs><linearGradient id="prefix___Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(229 311 -311 229 6 33)"><stop offset="0" stopColor="#41d1ff"/><stop offset="1" stopColor="#bd34fe"/></linearGradient><linearGradient id="prefix___Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="scale(287.174) rotate(81.706 .321 .407)"><stop offset="0" stopColor="#ffea83"/><stop offset=".08" stopColor="#ffdd35"/><stop offset="1" stopColor="#ffa800"/></linearGradient></defs></svg>
              </div>
              <div>
                <svg className="w-12 h-12 group-hover/skill:scale-110 transition-transform text-[#339933]" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 109 122.88" fill="currentColor"><g><path d="M68.43,87.08c-19.7,0-23.83-9.04-23.83-16.63c0-0.72,0.58-1.3,1.3-1.3h5.82c0.64,0,1.18,0.47,1.28,1.1 c0.88,5.93,3.49,8.92,15.41,8.92c9.49,0,13.52-2.14,13.52-7.18c0-2.9-1.15-5.05-15.89-6.49c-12.33-1.22-19.95-3.93-19.95-13.8 c0-9.08,7.66-14.49,20.5-14.49c14.42,0,21.56,5,22.46,15.76c0.03,0.37-0.1,0.73-0.35,1c-0.25,0.26-0.6,0.42-0.96,0.42H81.9 c-0.61,0-1.14-0.43-1.26-1.01c-1.41-6.23-4.81-8.23-14.07-8.23c-10.36,0-11.56,3.61-11.56,6.31c0,3.28,1.42,4.24,15.4,6.09 c13.84,1.84,20.41,4.43,20.41,14.16c0,9.81-8.18,15.43-22.45,15.43L68.43,87.08L68.43,87.08z M54.52,122.88 c-1.65,0-3.28-0.43-4.72-1.26l-15.03-8.9c-2.25-1.26-1.15-1.7-0.41-1.96c2.99-1.05,3.6-1.28,6.8-3.1c0.34-0.19,0.78-0.12,1.12,0.08 l11.55,6.85c0.42,0.23,1.01,0.23,1.4,0l45.03-25.99c0.42-0.24,0.69-0.72,0.69-1.22V35.43c0-0.52-0.27-0.98-0.7-1.24L55.23,8.22 c-0.42-0.25-0.97-0.25-1.39,0l-45,25.97c-0.44,0.25-0.71,0.73-0.71,1.23v51.96c0,0.5,0.27,0.97,0.7,1.21l12.33,7.12 c6.69,3.35,10.79-0.6,10.79-4.56V39.86c0-0.73,0.57-1.3,1.31-1.3l5.7,0c0.71,0,1.3,0.56,1.3,1.3v51.31 c0,8.93-4.87,14.05-13.33,14.05c-2.6,0-4.66,0-10.38-2.82L4.72,95.59C1.8,93.9,0,90.75,0,87.38V35.42c0-3.38,1.8-6.54,4.72-8.21 l45.07-26c2.85-1.61,6.64-1.61,9.47,0l45.02,26.01c2.91,1.68,4.72,4.82,4.72,8.21v51.96c0,3.37-1.81,6.51-4.72,8.21l-45.02,26 c-1.44,0.83-3.08,1.26-4.74,1.26L54.52,122.88L54.52,122.88z M54.52,122.88L54.52,122.88L54.52,122.88L54.52,122.88z"/></g></svg>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-6 pt-4 border-t border-white/5">
              {["React", "Vite", "Node.js", "Vue.js", "Next.js", "Nuxt.js"].map(s => <span key={s} className="px-2 py-1 bg-gray-800 rounded-md text-[11px] font-bold border border-gray-700 text-gray-300">{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          Projects Section - Grid
          ========================================= */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        id="projects" 
        className="pt-24 relative"
      >
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-secondary font-display tracking-widest text-sm uppercase">Case Studies</span>
              <div className="h-[1px] w-12 bg-secondary"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-wider">
              Featured Work
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm font-light text-base">
            Projects that demonstrate structural logic and clean UI execution.
          </p>
        </motion.div>

        {/* Clean, standard symmetrical grid */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full relative z-10">
          {data.project.map((proj) => (
            <div key={proj.id} className="w-full">
              <ProjectCard
                id={proj.id}
                title={proj.name}
                description={proj.description}
                tags={proj.tag}
                demoUrl={proj.link}
                repoUrl={proj.github}
                image={proj.cover}
              />
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* =========================================
          Mini Projects Section
          ========================================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="text-left mb-8 border-b border-white/10 pb-4 relative">
          <div className="absolute bottom-0 left-0 w-24 h-[2px] bg-secondary"></div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-wider">Mini Projects</h2>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.miniproject.map((miniProj) => (
            <MiniProjectCard
              key={miniProj.id}
              id={miniProj.id}
              title={miniProj.name}
              description={miniProj.description}
              tags={miniProj.tag}
              demoUrl={miniProj.link}
              repoUrl={miniProj.github}
              image={miniProj.cover}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* =========================================
          About Me Section
          ========================================= */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        id="about" 
        className="pb-20"
      >
        <motion.div variants={fadeUp} className="text-center md:text-left mb-12 border-b border-white/10 pb-6 relative">
          <div className="absolute bottom-0 left-0 hover:w-full transition-all duration-1000 w-32 h-[1px] bg-gradient-to-r from-primary to-transparent"></div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">ABOUT ME</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center lg:px-8">
          <motion.div variants={fadeUp} className="relative w-72 h-72 shrink-0 group">
            <div className="absolute inset-[-10px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-30 group-hover:opacity-60 blur-xl transition-opacity duration-700 animate-[spin_4s_linear_infinite]"></div>
            <div className="absolute inset-0 rounded-full border border-primary/50 shadow-[0_0_30px_rgba(74,222,128,0.3)] animate-[pulse_3s_ease-in-out_infinite]"></div>
            <div className="absolute inset-3 rounded-full border border-white/10 backdrop-blur-sm z-10"></div>
            <Image
              src="/data/image/proflie/profile1.webp"
              alt="Narongrit Sornjai Profile"
              fill
              className="rounded-full object-cover p-4 relative z-20 group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="glass-panel p-10 rounded-2xl border border-primary/20 hover:border-primary/40 transition-colors w-full max-w-2xl shadow-[0_0_30px_rgba(0,0,0,0.4)] relative group overflow-hidden">
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-[shimmer_2s_ease-in-out_infinite]"></div>
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <i className="bi bi-person-fill text-primary text-2xl mt-0.5"></i>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl text-white font-bold tracking-wide">Narongrit Sornjai <span className="text-gray-500 text-base font-normal tracking-normal ml-2">(ณรงค์ฤทธิ์ สอนใจ)</span></h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <i className="bi bi-mortarboard-fill text-primary text-xl mt-1"></i>
                <div className="flex-1">
                  <p className="text-gray-300 text-base md:text-lg">Department of Geology, Faculty of Science, Chulalongkorn University,</p>
                  <p className="text-primary/90 font-display tracking-wider text-sm mt-1 uppercase">2nd Class Honors</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <i className="bi bi-envelope-fill text-primary text-xl"></i>
                <a href="mailto:sonjainarongrit15@gmail.com" className="text-gray-300 text-lg hover:text-white transition-colors underline decoration-primary/30 underline-offset-4 hover:decoration-primary">sonjainarongrit15@gmail.com</a>
              </div>

              <div className="flex items-center gap-4">
                <i className="bi bi-telephone-fill text-primary text-xl"></i>
                <a href="tel:0968187630" className="text-gray-300 text-lg hover:text-white transition-colors underline decoration-primary/30 underline-offset-4 hover:decoration-primary">(+66) 096-818-7630</a>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-5 items-center justify-between relative z-10">
              <a href="/data/Resume_Narongrit_Sornjai.pdf" target="_blank" rel="noopener noreferrer" download="Resume_Narongrit_Sornjai.pdf" className="w-full sm:w-auto text-center px-8 py-3.5 bg-primary text-background-dark font-bold font-display uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(74,222,128,0.4)] hover:shadow-[0_0_25px_rgba(74,222,128,0.6)] hover:bg-white transition-all transform hover:-translate-y-1">
                DOWNLOAD RESUME
              </a>

              <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-end">
                <a href="https://www.facebook.com/nar.ngrit.s.njai.cr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary text-xl hover:bg-secondary hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-pointer"><i className="bi bi-facebook"></i></a>
                <a href="https://linkedin.com/in/narongrit-sornjai-53289b179" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary text-xl hover:bg-secondary hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-pointer"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}