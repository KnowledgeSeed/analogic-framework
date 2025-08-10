from abc import ABC, abstractmethod
import os
import shutil


class TranslationProvider(ABC):
    """Base class for translation providers."""

    def __init__(self, app_root):
        self.app_root = app_root

    @abstractmethod
    def generate_translations(self):
        """Generate translation assets for the application."""
        raise NotImplementedError

    def has_translations(self):
        """Return True if the static translation folder is not empty."""
        target_dir = os.path.join(self.app_root, 'static', 'assets', 'translations')
        return os.path.isdir(target_dir) and any(os.scandir(target_dir))


class JsonTranslationProvider(TranslationProvider):
    """Translation provider copying JSON files into static assets."""

    def generate_translations(self):
        source_dir = os.path.join(self.app_root, 'translations')
        target_dir = os.path.join(self.app_root, 'static', 'assets', 'translations')

        if not os.path.isdir(source_dir):
            return

        for root, _, files in os.walk(source_dir):
            rel = os.path.relpath(root, source_dir)
            dest = os.path.join(target_dir, rel)
            os.makedirs(dest, exist_ok=True)
            for file in files:
                shutil.copy2(os.path.join(root, file), os.path.join(dest, file))
