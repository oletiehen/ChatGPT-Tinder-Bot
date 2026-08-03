from typing import List, Dict
import openai


class ModelInterface:
    def chat_completion(self, messages: List[Dict]) -> str:
        pass

    def image_generation(self, prompt: str) -> str:
        pass


class OpenAIModel(ModelInterface):
    def __init__(self, api_key: str, model_engine: str,
                 max_tokens: int = 128, image_size: str = '512x512'):
        """Initialize the OpenAI model helper.

        Parameters
        ----------
        api_key: str
            The OpenAI API key.
        model_engine: str
            The model id/engine to use for completions.
        max_tokens: int, optional
            Maximum number of tokens to generate for text completions.
        image_size: str, optional
            Size of generated images.
        """

        openai.api_key = api_key
        self.model_engine = model_engine
        self.max_tokens = max_tokens
        self.image_size = image_size

    def chat_completion(self, messages) -> str:
        response = openai.ChatCompletion.create(
            model=self.model_engine,
            messages=messages
        )
        return response

    def text_completion(self, prompt: str) -> str:
        """Generate a text completion from a prompt."""
        response = openai.Completion.create(
            engine=self.model_engine,
            prompt=prompt,
            max_tokens=self.max_tokens,
            stop=None,
            temperature=0.5
        )
        return response.choices[0].text

    def image_generation(self, prompt: str) -> str:
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size=self.image_size
        )
        image_url = response.data[0].url
        return image_url
