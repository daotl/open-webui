# noqa: INP001
import os
import shutil
import subprocess
from sys import stderr

from hatchling.builders.hooks.plugin.interface import BuildHookInterface


class CustomBuildHook(BuildHookInterface):
    def initialize(self, version, build_data):
        super().initialize(version, build_data)
        stderr.write('>>> Building Open Webui frontend\n')

        pnpm = shutil.which('pnpm')
        if pnpm is not None:
            package_manager = [pnpm]
        else:
            corepack = shutil.which('corepack')
            if corepack is None:
                raise RuntimeError(
                    'pnpm is required for building Open Webui but neither `pnpm` nor `corepack` was found'
                )
            package_manager = [corepack, 'pnpm']

        stderr.write('### pnpm install\n')
        subprocess.run([*package_manager, 'install'], check=True)  # noqa: S603

        stderr.write('\n### pnpm run build\n')
        os.environ['APP_BUILD_HASH'] = version
        subprocess.run([*package_manager, 'run', 'build'], check=True)  # noqa: S603
