#!/usr/bin/env node
import pc from "picocolors";

function main() {
  console.clear();

  const banner = `
  ████████╗███╗   ██╗████████╗███████╗████████╗ █████╗  ██████╗██╗  ██╗
  ╚══██╔══╝████╗  ██║╚══██╔══╝██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
     ██║   ██╔██╗ ██║   ██║   ███████╗   ██║   ███████║██║     █████╔╝ 
     ██║   ██║╚██╗██║   ██║   ╚════██║   ██║   ██╔══██║██║     ██╔═██╗ 
     ██║   ██║ ╚████║   ██║   ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
     ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
  `;

  console.log(pc.cyan(banner));
  console.log(pc.bold(pc.green(" TNTStack Scaffold Tool\n")));
  console.log(pc.gray(" This tool will eventually scaffold your project.\n"));
}

main();
